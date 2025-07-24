import { Dimensions, Platform, StyleSheet } from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({

    // 메인 컨테이너 스타일 - ChatScreen 컴포넌트의 최상위 컨테이너에서 사용
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },

    // 상단 헤더 스타일 - ChatScreen의 BlurView 헤더에서 사용
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
        paddingBottom: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f59a23',
    },

    // 헤더 내용 컨테이너 스타일 - 헤더 내부 레이아웃에서 사용
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    // 로고 컨테이너 스타일 - 앱 로고와 이름을 담는 컨테이너에서 사용
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // 앱 로고 스타일 - 'V' 문자가 들어가는 원형 로고에서 사용 (헤더와 사이드메뉴에서 사용)
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffedd0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    logoSize: {
        width: 31,
        height: 31,
        borderRadius: 50
    },

    // 로고 텍스트 스타일 - 로고 내부의 'V' 문자 스타일
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#87CEEB',
    },

    // 앱 이름 텍스트 스타일 - 헤더의 'Verdora' 텍스트에서 사용
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },

    // 헤더 우측 버튼들 컨테이너 스타일 - 사용법 버튼과 메뉴 버튼을 담는 컨테이너
    rightButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // 사용법 가이드 버튼 스타일 - showGuide 함수가 연결된 버튼에서 사용
    guideButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },

    // 사용법 버튼 텍스트 스타일 - 사용법 버튼 내부 텍스트
    guideButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    // 햄버거 메뉴 버튼 스타일 - handleMenuPress 함수가 연결된 메뉴 버튼
    hamburgerButton: {
        padding: 8,
    },

    // 메시지 목록 스타일 - FlatList 컴포넌트에서 사용
    messagesList: {
        flex: 1,
    },

    // 메시지 컨테이너 스타일 - FlatList의 contentContainerStyle로 사용
    messagesContainer: {
        padding: 16,
        paddingBottom: 8,
    },

    // 메시지 래퍼 스타일 - renderMessage 함수에서 각 메시지를 감싸는 컨테이너
    messageWrapper: {
        marginVertical: 8,
    },

    // 사용자 메시지 래퍼 스타일 - 사용자 메시지의 정렬을 위한 스타일 (renderMessage에서 사용)
    userMessageWrapper: {
        alignItems: 'flex-end',
    },

    // AI 메시지 래퍼 스타일 - AI 메시지의 정렬을 위한 스타일 (renderMessage에서 사용)
    aiMessageWrapper: {
        alignItems: 'flex-start',
    },

    // AI 프로필 컨테이너 스타일 - AI 메시지의 프로필 이미지와 이름을 담는 컨테이너 (renderMessage에서 사용)
    aiProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        marginLeft: 4,
    },

    // 프로필 이미지 컨테이너 스타일 - AI 프로필 이미지를 감싸는 컨테이너
    profileImageContainer: {
        marginRight: 8,
    },

    // 프로필 이미지 플레이스홀더 스타일 - AI의 'V' 프로필 이미지 배경
    profileImagePlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffedd0',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // 프로필 이니셜 스타일 - AI 프로필의 'V' 문자 스타일
    profileInitial: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },

    // 발신자 이름 스타일 - AI 메시지의 'Verdora' 이름 텍스트
    senderName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#a35c00',
    },

    // 메시지 컨테이너 스타일 - 실제 메시지 내용을 담는 말풍선 컨테이너 (renderMessage에서 사용)
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

    // 사용자 메시지 스타일 - 사용자가 보낸 메시지의 말풍선 배경 (renderMessage에서 사용)
    userMessage: {
        backgroundColor: '#f59a23',
        borderBottomRightRadius: 4,
    },

    // 다른 사람(AI) 메시지 스타일 - AI가 보낸 메시지의 말풍선 배경 (renderMessage에서 사용)
    otherMessage: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        marginLeft: 40,
    },

    // 메시지 텍스트 스타일 - 메시지 내용의 기본 텍스트 스타일 (renderMessage에서 사용)
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },

    // 파일과 함께 있는 메시지 텍스트 스타일 - 첨부파일이 있는 메시지의 텍스트 마진
    messageTextWithFile: {
        marginTop: 8,
    },

    // 사용자 메시지 텍스트 스타일 - 사용자 메시지의 흰색 텍스트
    userMessageText: {
        color: '#fff',
    },

    // 다른 사람 메시지 텍스트 스타일 - AI 메시지의 검은색 텍스트
    otherMessageText: {
        color: '#000',
    },

    // 타임스탬프 스타일 - 메시지 시간 표시의 기본 스타일 (renderMessage에서 사용)
    timestamp: {
        fontSize: 11,
        marginTop: 4,
    },

    // 사용자 타임스탬프 스타일 - 사용자 메시지의 시간 표시
    userTimestamp: {
        color: '#fff',
        opacity: 0.7,
        textAlign: 'right',
    },

    // AI 타임스탬프 스타일 - AI 메시지의 시간 표시
    aiTimestamp: {
        color: '#666',
        opacity: 0.7,
    },

    // 입력 컨테이너 스타일 - 메시지 입력창과 버튼들을 담는 하단 컨테이너
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
    },

    // 첨부 버튼 스타일 - 파일 첨부를 위한 '+' 버튼 (첨부 모달을 여는 버튼)
    attachButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#f0f0f0',
    },

    // 텍스트 입력창 스타일 - 메시지를 입력하는 TextInput 컴포넌트
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

    // 전송 버튼 스타일 - sendMessage 함수가 연결된 메시지 전송 버튼
    sendButton: {
        backgroundColor: '#F59A23',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // 첨부파일 미리보기 스타일 - 첨부된 파일을 보여주는 영역 (첨부파일이 있을 때 표시)
    attachmentPreview: {
        padding: 16,
        paddingBottom: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },

    // 첨부파일 컨테이너 스타일 - renderAttachedFile 함수에서 파일을 감싸는 컨테이너
    attachedFileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 12,
    },

    // 메시지 내 첨부파일 스타일 - 메시지 안에 표시되는 첨부파일의 배경색
    attachedFileInMessage: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 8,
    },

    // 첨부 이미지 컨테이너 스타일 - 이미지 첨부파일의 컨테이너 (renderAttachedFile에서 사용)
    attachedImageContainer: {
        position: 'relative',
    },

    // 첨부 이미지 스타일 - 실제 이미지 표시 영역
    attachedImage: {
        width: Math.min(SCREEN_WIDTH * 0.6, 250),
        height: 150,
        borderRadius: 12,
    },

    // 첨부 문서 컨테이너 스타일 - 문서 첨부파일의 컨테이너 (renderAttachedFile에서 사용)
    attachedDocumentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    // 문서 아이콘 컨테이너 스타일 - 문서 아이콘을 감싸는 원형 배경
    documentIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e3f2fd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    // 문서 정보 컨테이너 스타일 - 문서 이름과 크기 정보를 담는 컨테이너
    documentInfo: {
        flex: 1,
    },

    // 문서 이름 스타일 - 첨부된 문서의 파일명 표시 (formatSize 함수와 함께 사용)
    documentName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },

    // 문서 크기 스타일 - formatSize 함수로 변환된 파일 크기 표시
    documentSize: {
        fontSize: 12,
        opacity: 0.7,
        marginTop: 2,
        color: '#666',
    },

    // 파일 제거 버튼 스타일 - removeFile 함수가 연결된 'X' 버튼
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

    // 메뉴 배경 스타일 - renderSideMenu 함수에서 사이드 메뉴의 반투명 배경
    menuBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    // 메뉴 드로어 스타일 - renderSideMenu 함수에서 실제 메뉴 패널
    menuDrawer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: SCREEN_WIDTH * 0.8,
        maxWidth: 320,
        backgroundColor: '#f8f9fa',
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 0},
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 10,
    },

    // 메뉴 헤더 컨테이너 스타일 - 사이드 메뉴 상단의 로고와 제목 영역
    menuHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
    },

    // 메뉴 헤더 제목 스타일 - 사이드 메뉴의 'Verdora' 제목
    menuHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A35C00',
        marginLeft: 12,
    },

    // 메뉴 구분선 스타일 - 메뉴 항목들 사이의 구분선
    menuSeparator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 20,
    },

    // 메뉴 항목 스타일 - handleMenuItemPress 함수가 연결된 각 메뉴 항목
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },

    // 메뉴 항목 아이콘 스타일 - 각 메뉴 항목의 아이콘
    menuItemIcon: {
        marginRight: 16,
        width: 24,
        textAlign: 'center',
    },

    // 메뉴 항목 텍스트 스타일 - 각 메뉴 항목의 텍스트
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },

    // 메뉴 푸터 스타일 - 사이드 메뉴 하단 영역 (삭제 버튼 포함)
    menuFooter: {
        marginTop: 'auto',
        paddingBottom: 40,
    },

    // 첨부 모달 배경 스타일 - 파일 첨부 선택 모달의 배경
    attachmentModalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        // justifyContent: 'flex-end',
    },

    // 첨부 모달 컨테이너 스타일 - 파일 첨부 선택 모달의 컨테이너
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

    // 첨부 모달 제목 스타일 - 첨부 모달의 제목 텍스트
    attachmentModalTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 24,
        color: '#333',
    },

    // 첨부 옵션 래퍼 스타일 - 첨부 옵션 버튼들을 담는 컨테이너
    attachmentOptionsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },

    // 첨부 옵션 버튼 스타일 - 각 첨부 옵션 버튼
    attachmentOptionButton: {
        alignItems: 'center',
        width: 80,
    },

    // 첨부 옵션 아이콘 컨테이너 스타일 - 각 첨부 옵션 아이콘의 배경
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

    // 첨부 옵션 텍스트 스타일 - 각 첨부 옵션 버튼의 텍스트
    attachmentOptionText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
});

export default styles;
