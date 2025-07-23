import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#0022ff',
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
        shadowOffset: {width: 0, height: 2},
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
        shadowOffset: {width: 0, height: 1},
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
    removeFileButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    // --- 🔽 [수정] 사이드 메뉴 스타일 🔽 ---
    menuBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    menuDrawer: {
        position: 'absolute',
        right: 0, // left: 0 에서 right: 0 으로 변경
        top: 0,
        bottom: 0,
        width: SCREEN_WIDTH * 0.8,
        maxWidth: 320,
        backgroundColor: '#f8f9fa',
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 0}, // 그림자 방향을 왼쪽으로 변경
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 10,
    },
    menuHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
    },
    menuHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0022ff',
        marginLeft: 12,
    },
    menuSeparator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    menuItemIcon: {
        marginRight: 16,
        width: 24, // 아이콘 너비 고정으로 텍스트 정렬 유지
        textAlign: 'center',
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    menuFooter: {
        marginTop: 'auto', // 메뉴 하단에 고정
        paddingBottom: 40,
    },
    documentSize: {
        fontSize: 12,
        opacity: 0.7,
        marginTop: 2,
        color: '#666',
    },
    // --- 🔼 [추가] 사이드 메뉴 스타일 🔼 ---
    attachmentModalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'flex-end',
    },
    attachmentModalContainer: {
        backgroundColor: '#f8f9fa',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingTop: 24,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    attachmentModalTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 24,
        color: '#333',
    },
    attachmentOptionsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    attachmentOptionButton: {
        alignItems: 'center',
        width: 80,
    },
    attachmentOptionIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    attachmentOptionText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    // --- 🔼 [추가] 첨부파일 선택 모달 스타일 🔼 ---
});

export default styles;
