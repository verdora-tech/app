import React, {useEffect, useRef, useState} from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {Image} from 'expo-image';
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {BlurView} from 'expo-blur';
import * as Haptics from 'expo-haptics';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import styles from '@/constants/style';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

interface AttachedFile {
    id: string;
    uri: string;
    name: string;
    type: 'image' | 'document';
    size: number;
    mimeType: string;
}

interface Message {
    id: string;
    text: string;
    timestamp: Date;
    isUser: boolean;
    sender: 'You' | 'Verdora';
    attachedFile?: AttachedFile;
}

export default function ChatScreen() {
    const tabBarHeight = useBottomTabBarHeight();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '안녕하세요! 저는 Verdora입니다. 무엇을 도와드릴까요? 😊',
            timestamp: new Date(),
            isUser: false,
            sender: 'Verdora',
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
    const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);

    const flatListRef = useRef<FlatList<Message>>(null);

    useEffect(() => {
        const timer = setTimeout(() => flatListRef.current?.scrollToEnd({animated: true}), 100);
        return () => clearTimeout(timer); // 메모리 누수를 방지하기 위해 타이머 정리
    }, [messages]);

    const [isMenuVisible, setMenuVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

    const openMenu = () => {
        setMenuVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const closeMenu = () => {
        Animated.timing(slideAnim, {
            toValue: SCREEN_WIDTH,
            duration: 250,
            useNativeDriver: true,
        }).start(() => setMenuVisible(false));
    };

    const getVerdoraResponse = (msg: string, hasFile = false): string => {
        if (hasFile) {
            const fileResponses = [
                '파일을 확인했습니다! 흥미로운 내용이네요.',
                '첨부해주신 파일 감사합니다. 어떤 도움이 필요하신가요?',
                '파일을 잘 받았습니다! 이것에 대해 더 자세히 알려주세요.',
                '좋은 자료네요! 이와 관련해서 궁금한 점이 있으시면 언제든 물어보세요.',
            ];
            return fileResponses[Math.floor(Math.random() * fileResponses.length)];
        }
        const responses = [
            '흥미로운 질문이네요! 더 자세히 설명해주시겠어요?',
            '네, 이해했습니다. 다른 궁금한 것이 있으신가요?',
            '좋은 생각이에요! 어떻게 도와드릴까요?',
            '그렇군요! 더 많은 정보를 원하시면 언제든 말씀해주세요.',
            '정말 재미있는 주제네요. 계속 이야기해보아요!',
            '감사합니다! 다른 도움이 필요하시면 알려주세요.',
            '네, 알겠습니다. 또 다른 질문이 있으신가요?',
        ];
        if (msg.includes('안녕') || msg.includes('hello')) return '안녕하세요! 좋은 하루 보내고 계신가요? 🌟';
        if (msg.includes('고마워') || msg.includes('감사')) return '천만에요! 언제든지 도와드릴게요. 💫';
        if (msg.includes('이름') || msg.includes('누구')) return '저는 Verdora예요! AI 어시스턴트로서 여러분을 도와드리고 있어요. ✨';
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const sendMessage = async () => {
        if (inputText.trim() || attachedFile) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    text: inputText.trim() || (attachedFile ? '파일을 첨부했습니다.' : ''),
                    timestamp: new Date(),
                    isUser: true,
                    sender: 'You',
                    attachedFile: attachedFile || undefined,
                }
            ]);
            const msg = inputText.trim();
            const hasFile = !!attachedFile;
            setInputText('');
            setAttachedFile(null);
            setTimeout(async () => {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                setMessages(prev => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        text: getVerdoraResponse(msg, hasFile),
                        timestamp: new Date(),
                        isUser: false,
                        sender: 'Verdora',
                    }
                ]);
            }, 1000);
        }
    };

    const handleFileSelection = async (result: any, type: 'image' | 'document') => {
        if (!result.canceled && result.assets?.length) {
            const asset = result.assets[0];
            if (type === 'image' || ['.txt', '.md', '.pdf'].some(ext => asset.uri.endsWith(ext))) {
                setAttachedFile({
                    id: Date.now().toString(),
                    uri: asset.uri,
                    name: asset.fileName ?? (type === 'image' ? 'image.jpg' : 'document'),
                    type,
                    size: asset.fileSize ?? 0,
                    mimeType: asset.type ?? (type === 'image' ? 'image/jpeg' : 'application/octet-stream'),
                });
            } else {
                console.warn('Only .txt, .md, .pdf files are allowed.');
            }
        }
    };

    const pickCamera = async () => {
        setAttachmentModalVisible(false);
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8
        });
        await handleFileSelection(result, 'image');
    };

    const pickGallery = async () => {
        setAttachmentModalVisible(false);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8
        });
        await handleFileSelection(result, 'image');
    };

    const pickDocument = async () => {
        setAttachmentModalVisible(false);
        const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true});
        await handleFileSelection(result, 'document');
    };

    const removeFile = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setAttachedFile(null);
    };

    const formatSize = (bytes: number): string => {
        if (!bytes) return '0 Bytes';
        const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const showGuide = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert('사용법', '• Verdora와 자유롭게 대화하세요\n• 질문을 입력하고 전송 버튼을 누르세요\n• + 버튼으로 파일을 첨부할 수 있습니다\n• AI가 자동으로 응답해드립니다', [{text: '확인'}]);
    };

    const handleMenuPress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        openMenu();
    };

    const handleMenuItemPress = (key: string) => {
        closeMenu();
        setTimeout(() => {
            switch (key) {
                case 'country':
                    Alert.alert('알림', '나라 설정 기능은 준비 중입니다.');
                    break;
                case 'language':
                    Alert.alert('알림', '언어 설정 기능은 준비 중입니다.');
                    break;
                case 'travel':
                    Alert.alert('알림', '타국 여행시 주의점 안내 기능은 준비 중입니다.');
                    break;
                case 'cases':
                    Alert.alert('알림', '관련 사례 보기 기능은 준비 중입니다.');
                    break;
                case 'delete':
                    Alert.alert(
                        '정말 삭제하시겠습니까?',
                        '모든 대화 내용이 사라지며, 복구할 수 없습니다.',
                        [
                            {
                                text: '삭제',
                                style: 'destructive',
                                onPress: async () => {
                                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                                    setMessages([{
                                        id: '1',
                                        text: '안녕하세요! 저는 Verdora입니다. 무엇을 도와드릴까요? 😊',
                                        timestamp: new Date(),
                                        isUser: false,
                                        sender: 'Verdora',
                                    }]);
                                },
                            },
                            {text: '취소', style: 'cancel'},
                        ]
                    );
                    break;
            }
        }, 250);
    };

    const renderSideMenu = () => {
        const menuItems = [
            {key: 'country', icon: 'globe-outline', text: '나라 설정'},
            {key: 'language', icon: 'language-outline', text: '언어 설정'},
            {key: 'travel', icon: 'alert-circle-outline', text: '타국 여행시 주의점'},
            {key: 'cases', icon: 'book-outline', text: '관련 사례'},
        ];
        return (
            <Modal transparent visible={isMenuVisible} onRequestClose={closeMenu} animationType="fade">
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={styles.menuBackdrop}>
                        <Animated.View style={[styles.menuDrawer, {transform: [{translateX: slideAnim}]}]}>
                            <TouchableWithoutFeedback>
                                <ThemedView style={{flex: 1}}>
                                    <View style={styles.menuHeaderContainer}>
                                        <View style={styles.logo}>
                                            <ThemedText style={styles.logoText}>V</ThemedText>
                                        </View>
                                        <ThemedText style={styles.menuHeaderTitle}>Verdora</ThemedText>
                                    </View>
                                    <View style={styles.menuSeparator}/>
                                    {menuItems.map(item => (
                                        <TouchableOpacity key={item.key} style={styles.menuItem}
                                                          onPress={() => handleMenuItemPress(item.key)}>
                                            <Ionicons name={item.icon as any} size={22} color="#555"
                                                      style={styles.menuItemIcon}/>
                                            <ThemedText style={styles.menuItemText}>{item.text}</ThemedText>
                                        </TouchableOpacity>
                                    ))}
                                    <View style={styles.menuFooter}>
                                        <View style={styles.menuSeparator}/>
                                        <TouchableOpacity style={styles.menuItem}
                                                          onPress={() => handleMenuItemPress('delete')}>
                                            <Ionicons name="trash-outline" size={22} color="#ff4444"
                                                      style={styles.menuItemIcon}/>
                                            <ThemedText style={[styles.menuItemText, {color: '#ff4444'}]}>채팅 기록
                                                삭제</ThemedText>
                                        </TouchableOpacity>
                                    </View>
                                </ThemedView>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    const renderAttachedFile = (file: AttachedFile, inMsg = false) => (
        <View style={[styles.attachedFileContainer, inMsg && styles.attachedFileInMessage]}>
            {file.type === 'image' ? (
                <View style={styles.attachedImageContainer}>
                    <Image source={{uri: file.uri}} style={styles.attachedImage} contentFit="cover" transition={200}/>
                    {!inMsg && (
                        <TouchableOpacity style={styles.removeFileButton} onPress={removeFile}
                                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                            <Ionicons name="close-circle" size={20} color="#ff4444"/>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <View style={styles.attachedDocumentContainer}>
                    <View style={styles.documentIconContainer}>
                        <Ionicons name="document-text" size={24} color="#666"/>
                    </View>
                    <View style={styles.documentInfo}>
                        <ThemedText style={styles.documentName} numberOfLines={1}>{file.name}</ThemedText>
                        {file.size && <ThemedText style={styles.documentSize}>{formatSize(file.size)}</ThemedText>}
                    </View>
                    {!inMsg && (
                        <TouchableOpacity style={styles.removeFileButton} onPress={removeFile}
                                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                            <Ionicons name="close-circle" size={20} color="#ff4444"/>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );

    const renderMessage = ({item}: { item: Message }) => (
        <View style={[
            styles.messageWrapper,
            item.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper
        ]}>
            {!item.isUser && (
                <View style={styles.aiProfileContainer}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImagePlaceholder}>
                            <ThemedText style={styles.profileInitial}>V</ThemedText>
                        </View>
                    </View>
                    <ThemedText style={styles.senderName}>Verdora</ThemedText>
                </View>
            )}
            <View style={[
                styles.messageContainer,
                item.isUser ? styles.userMessage : styles.otherMessage
            ]}>
                {item.attachedFile && renderAttachedFile(item.attachedFile, true)}
                {item.text && (
                    <ThemedText style={[
                        styles.messageText,
                        item.isUser ? styles.userMessageText : styles.otherMessageText,
                        item.attachedFile && styles.messageTextWithFile
                    ]}>
                        {item.text}
                    </ThemedText>
                )}
                <ThemedText style={[
                    styles.timestamp,
                    item.isUser ? styles.userTimestamp : styles.aiTimestamp
                ]}>
                    {item.timestamp.toLocaleTimeString('ko-KR', {hour: '2-digit', minute: '2-digit'})}
                </ThemedText>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? tabBarHeight : 0}
        >
            <BlurView intensity={100} tint="light" style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <ThemedText style={styles.logoText}>V</ThemedText>
                        </View>
                        <ThemedText style={styles.appName}>Verdora</ThemedText>
                    </View>
                    <View style={styles.rightButtons}>
                        <TouchableOpacity style={styles.guideButton} onPress={showGuide}>
                            <ThemedText style={styles.guideButtonText}>사용법</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.hamburgerButton} onPress={handleMenuPress}>
                            <Ionicons name="menu" size={24} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.messagesList}
                contentContainerStyle={styles.messagesContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            />
            {attachedFile && (
                <BlurView intensity={95} tint="light" style={styles.attachmentPreview}>
                    {renderAttachedFile(attachedFile)}
                </BlurView>
            )}
            <ThemedView style={[styles.inputContainer, {paddingBottom: tabBarHeight + 16}]}>
                <TouchableOpacity style={styles.attachButton} onPress={() => setAttachmentModalVisible(true)}
                                  hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                    <Ionicons name="add" size={24} color="#007AFF"/>
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Verdora에게 메시지를 보내세요..."
                    placeholderTextColor="#999"
                    multiline
                    maxLength={1000}
                    returnKeyType="send"
                />
                <TouchableOpacity
                    style={[styles.sendButton, {opacity: (inputText.trim() || attachedFile) ? 1 : 0.5}]}
                    onPress={sendMessage}
                    disabled={!inputText.trim() && !attachedFile}
                    hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                >
                    <Ionicons name="send" size={20} color="#fff"/>
                </TouchableOpacity>
            </ThemedView>
            <Modal
                visible={attachmentModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setAttachmentModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setAttachmentModalVisible(false)}>
                    <View style={styles.attachmentModalBackdrop}/>
                </TouchableWithoutFeedback>
                <View style={styles.attachmentModalContainer}>
                    <Text style={styles.attachmentModalTitle}>첨부파일 선택</Text>
                    <View style={styles.attachmentOptionsWrapper}>
                        <TouchableOpacity style={styles.attachmentOptionButton} onPress={pickCamera}>
                            <View style={styles.attachmentOptionIconContainer}>
                                <Ionicons name="camera" size={32} color="#007AFF"/>
                            </View>
                            <Text style={styles.attachmentOptionText}>카메라</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.attachmentOptionButton} onPress={pickGallery}>
                            <View style={styles.attachmentOptionIconContainer}>
                                <Ionicons name="image" size={32} color="#007AFF"/>
                            </View>
                            <Text style={styles.attachmentOptionText}>갤러리</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.attachmentOptionButton} onPress={pickDocument}>
                            <View style={styles.attachmentOptionIconContainer}>
                                <Ionicons name="document" size={32} color="#007AFF"/>
                            </View>
                            <Text style={styles.attachmentOptionText}>파일</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {renderSideMenu()}
        </KeyboardAvoidingView>
    );
}
