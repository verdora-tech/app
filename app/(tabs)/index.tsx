import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Dimensions
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AttachedFile {
    id: string;
    uri: string;
    name: string;
    type: 'image' | 'document';
    size?: number;
    mimeType?: string;
}

interface Message {
    id: string;
    text: string;
    timestamp: Date;
    isUser: boolean;
    sender?: string;
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

    const getVerdoraResponse = (userMessage: string, hasFile: boolean = false): string => {
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

        if (userMessage.includes('안녕') || userMessage.includes('hello')) {
            return '안녕하세요! 좋은 하루 보내고 계신가요? 🌟';
        }
        if (userMessage.includes('고마워') || userMessage.includes('감사')) {
            return '천만에요! 언제든지 도와드릴게요. 💫';
        }
        if (userMessage.includes('이름') || userMessage.includes('누구')) {
            return '저는 Verdora예요! AI 어시스턴트로서 여러분을 도와드리고 있어요. ✨';
        }

        return responses[Math.floor(Math.random() * responses.length)];
    };

    const sendMessage = async () => {
        if (inputText.trim() || attachedFile) {
            // 햅틱 피드백
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputText.trim() || (attachedFile ? '파일을 첨부했습니다.' : ''),
                timestamp: new Date(),
                isUser: true,
                sender: 'You',
                attachedFile: attachedFile || undefined,
            };

            setMessages(prev => [...prev, newMessage]);
            const userMessageText = inputText.trim();
            const hasFile = !!attachedFile;
            setInputText('');
            setAttachedFile(null);

            // Verdora의 응답 시뮬레이션
            setTimeout(async () => {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                const autoReply: Message = {
                    id: (Date.now() + 1).toString(),
                    text: getVerdoraResponse(userMessageText, hasFile),
                    timestamp: new Date(),
                    isUser: false,
                    sender: 'Verdora',
                };
                setMessages(prev => [...prev, autoReply]);
            }, 1000);
        }
    };

    const showAttachmentOptions = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        Alert.alert(
            '파일 첨부',
            '어떤 파일을 첨부하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                { text: '📷 사진 촬영', onPress: takePhoto },
                { text: '🖼️ 사진 선택', onPress: pickImage },
                { text: '📄 문서 선택', onPress: pickDocument },
            ]
        );
    };

    const takePhoto = async () => {
        try {
            // 권한 요청
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('권한 필요', '카메라 권한이 필요합니다.');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: false,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                setAttachedFile({
                    id: Date.now().toString(),
                    uri: asset.uri,
                    name: `photo_${Date.now()}.jpg`,
                    type: 'image',
                    size: asset.fileSize,
                });
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
        } catch (error) {
            console.error('Camera error:', error);
            Alert.alert('오류', '사진 촬영 중 오류가 발생했습니다.');
        }
    };

    const pickImage = async () => {
        try {
            // 권한 요청
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('권한 필요', '사진 라이브러리 접근 권한이 필요합니다.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: false,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                setAttachedFile({
                    id: Date.now().toString(),
                    uri: asset.uri,
                    name: asset.fileName || `image_${Date.now()}.jpg`,
                    type: 'image',
                    size: asset.fileSize,
                });
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
        } catch (error) {
            console.error('Image picker error:', error);
            Alert.alert('오류', '이미지 선택 중 오류가 발생했습니다.');
        }
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
                multiple: false,
            });

            if (!result.canceled && result.assets && result.assets[0]) {
                const asset = result.assets[0];
                setAttachedFile({
                    id: Date.now().toString(),
                    uri: asset.uri,
                    name: asset.name,
                    type: 'document',
                    size: asset.size || undefined,
                    mimeType: asset.mimeType || undefined,
                });
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
        } catch (error) {
            console.error('Document picker error:', error);
            Alert.alert('오류', '문서 선택 중 오류가 발생했습니다.');
        }
    };

    const removeAttachedFile = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setAttachedFile(null);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleGuidePress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert(
            '사용법',
            '• Verdora와 자유롭게 대화하세요\n• 질문을 입력하고 전송 버튼을 누르세요\n• + 버튼으로 파일을 첨부할 수 있습니다\n• AI가 자동으로 응답해드립니다',
            [{ text: '확인' }]
        );
    };

    const handleMenuPress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Alert.alert(
            '메뉴',
            '원하는 기능을 선택하세요',
            [
                {
                    text: '🗑️ 채팅 기록 삭제',
                    onPress: async () => {
                        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                        setMessages([{
                            id: '1',
                            text: '안녕하세요! 저는 Verdora입니다. 무엇을 도와드릴까요? 😊',
                            timestamp: new Date(),
                            isUser: false,
                            sender: 'Verdora',
                        }]);
                    }
                },
                { text: '⚙️ 설정' },
                { text: '취소', style: 'cancel' }
            ]
        );
    };

    const renderAttachedFile = (file: AttachedFile, isInMessage: boolean = false) => (
        <View style={[styles.attachedFileContainer, isInMessage && styles.attachedFileInMessage]}>
            {file.type === 'image' ? (
                <View style={styles.attachedImageContainer}>
                    <Image
                        source={{ uri: file.uri }}
                        style={styles.attachedImage}
                        contentFit="cover"
                        transition={200}
                    />
                    {!isInMessage && (
                        <TouchableOpacity
                            style={styles.removeFileButton}
                            onPress={removeAttachedFile}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="close-circle" size={20} color="#ff4444" />
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <View style={styles.attachedDocumentContainer}>
                    <View style={styles.documentIconContainer}>
                        <Ionicons name="document-text" size={24} color="#666" />
                    </View>
                    <View style={styles.documentInfo}>
                        <ThemedText style={styles.documentName} numberOfLines={1}>
                            {file.name}
                        </ThemedText>
                        {file.size && (
                            <ThemedText style={styles.documentSize}>
                                {formatFileSize(file.size)}
                            </ThemedText>
                        )}
                    </View>
                    {!isInMessage && (
                        <TouchableOpacity
                            style={styles.removeFileButton}
                            onPress={removeAttachedFile}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="close-circle" size={20} color="#ff4444" />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );

    const renderMessage = ({ item }: { item: Message }) => (
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
                    {item.timestamp.toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
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
            {/* 커스텀 헤더 */}
            <BlurView intensity={100} tint="light" style={styles.header}>
                <View style={styles.headerContent}>
                    {/* 왼쪽 로고 */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <ThemedText style={styles.logoText}>V</ThemedText>
                        </View>
                        <ThemedText style={styles.appName}>Verdora</ThemedText>
                    </View>

                    {/* 오른쪽 버튼들 */}
                    <View style={styles.rightButtons}>
                        <TouchableOpacity
                            style={styles.guideButton}
                            onPress={handleGuidePress}
                        >
                            <ThemedText style={styles.guideButtonText}>사용법</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.hamburgerButton}
                            onPress={handleMenuPress}
                        >
                            <Ionicons name="menu" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>

            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.messagesList}
                contentContainerStyle={styles.messagesContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                maintainVisibleContentPosition={{
                    minIndexForVisible: 0,
                }}
            />

            {/* 첨부된 파일 미리보기 */}
            {attachedFile && (
                <BlurView intensity={95} tint="light" style={styles.attachmentPreview}>
                    {renderAttachedFile(attachedFile)}
                </BlurView>
            )}

            <ThemedView style={[styles.inputContainer, { paddingBottom: tabBarHeight + 16 }]}>
                <TouchableOpacity
                    style={styles.attachButton}
                    onPress={showAttachmentOptions}
                    hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                    <Ionicons name="add" size={24} color="#007AFF" />
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
                    blurOnSubmit={false}
                />

                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        { opacity: (inputText.trim() || attachedFile) ? 1 : 0.5 }
                    ]}
                    onPress={sendMessage}
                    disabled={!inputText.trim() && !attachedFile}
                    hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </ThemedView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#87CEEB',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#87CEEB',
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    rightButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    guideButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    guideButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    hamburgerButton: {
        padding: 8,
    },
    messagesList: {
        flex: 1,
    },
    messagesContainer: {
        padding: 16,
        paddingBottom: 8,
    },
    messageWrapper: {
        marginVertical: 8,
    },
    userMessageWrapper: {
        alignItems: 'flex-end',
    },
    aiMessageWrapper: {
        alignItems: 'flex-start',
    },
    aiProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        marginLeft: 4,
    },
    profileImageContainer: {
        marginRight: 8,
    },
    profileImagePlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitial: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    senderName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4A90E2',
    },
    messageContainer: {
        maxWidth: SCREEN_WIDTH * 0.8,
        padding: 12,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    userMessage: {
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 4,
    },
    otherMessage: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        marginLeft: 40,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    messageTextWithFile: {
        marginTop: 8,
    },
    userMessageText: {
        color: '#fff',
    },
    otherMessageText: {
        color: '#000',
    },
    timestamp: {
        fontSize: 11,
        marginTop: 4,
    },
    userTimestamp: {
        color: '#fff',
        opacity: 0.7,
        textAlign: 'right',
    },
    aiTimestamp: {
        color: '#666',
        opacity: 0.7,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
    },
    attachButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#f0f0f0',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        maxHeight: 100,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    attachmentPreview: {
        padding: 16,
        paddingBottom: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    attachedFileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 12,
    },
    attachedFileInMessage: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 8,
    },
    attachedImageContainer: {
        position: 'relative',
    },
    attachedImage: {
        width: Math.min(SCREEN_WIDTH * 0.6, 250),
        height: 150,
        borderRadius: 12,
    },
    attachedDocumentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    documentIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e3f2fd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    documentInfo: {
        flex: 1,
    },
    documentName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    documentSize: {
        fontSize: 12,
        opacity: 0.7,
        marginTop: 2,
        color: '#666',
    },
    removeFileButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
