import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {IconSymbol} from '@/components/ui/IconSymbol';

// 국가 목록 데이터
const COUNTRIES = [
    {code: 'KR', name: '대한민국', flag: '🇰🇷'},
    {code: 'US', name: '미국', flag: '🇺🇸'},
    {code: 'JP', name: '일본', flag: '🇯🇵'},
    {code: 'CN', name: '중국', flag: '🇨🇳'},
    {code: 'GB', name: '영국', flag: '🇬🇧'},
    {code: 'FR', name: '프랑스', flag: '🇫🇷'},
    {code: 'DE', name: '독일', flag: '🇩🇪'},
    {code: 'CA', name: '캐나다', flag: '🇨🇦'},
    {code: 'AU', name: '호주', flag: '🇦🇺'},
    {code: 'IN', name: '인도', flag: '🇮🇳'},
    {code: 'BR', name: '브라질', flag: '🇧🇷'},
    {code: 'RU', name: '러시아', flag: '🇷🇺'},
];

export default function CountrySettingsScreen() {
    const [homeCountry, setHomeCountry] = useState<string>('KR');
    const [foreignCountry, setForeignCountry] = useState<string>('US');
    const [showHomeCountryPicker, setShowHomeCountryPicker] = useState(false);
    const [showForeignCountryPicker, setShowForeignCountryPicker] = useState(false);

    // 저장된 설정 불러오기
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedHomeCountry = await AsyncStorage.getItem('homeCountry');
            const savedForeignCountry = await AsyncStorage.getItem('foreignCountry');

            if (savedHomeCountry) setHomeCountry(savedHomeCountry);
            if (savedForeignCountry) setForeignCountry(savedForeignCountry);
        } catch (error) {
            console.error('설정 불러오기 실패:', error);
        }
    };

    // 설정 저장하기
    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem('homeCountry', homeCountry);
            await AsyncStorage.setItem('foreignCountry', foreignCountry);
            Alert.alert('저장 완료', '국가 설정이 저장되었습니다.');
        } catch (error) {
            console.error('설정 저장 실패:', error);
            Alert.alert('저장 실패', '설정 저장 중 오류가 발생했습니다.');
        }
    };

    const getCountryInfo = (code: string) => {
        return COUNTRIES.find(country => country.code === code) || COUNTRIES[0];
    };

    const renderCountryPicker = (
        selectedCountry: string,
        onSelect: (code: string) => void,
        onClose: () => void
    ) => (
        <ThemedView style={styles.pickerContainer}>
            <ScrollView style={styles.pickerScroll}>
                {COUNTRIES.map((country) => (
                    <TouchableOpacity
                        key={country.code}
                        style={[
                            styles.countryOption,
                            selectedCountry === country.code && styles.selectedOption
                        ]}
                        onPress={() => {
                            onSelect(country.code);
                            onClose();
                        }}
                    >
                        <ThemedText style={styles.flag}>{country.flag}</ThemedText>
                        <ThemedText style={styles.countryName}>{country.name}</ThemedText>
                        {selectedCountry === country.code && (
                            <IconSymbol name="checkmark" size={20} color="#007AFF"/>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <ThemedText style={styles.closeButtonText}>닫기</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">국가 설정</ThemedText>
                    <ThemedText style={styles.subtitle}>
                        자국과 타국을 설정하여 맞춤형 서비스를 이용하세요
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.settingContainer}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>자국 설정</ThemedText>
                    <TouchableOpacity
                        style={styles.countrySelector}
                        onPress={() => setShowHomeCountryPicker(true)}
                    >
                        <ThemedView style={styles.selectedCountry}>
                            <ThemedText style={styles.selectedFlag}>
                                {getCountryInfo(homeCountry).flag}
                            </ThemedText>
                            <ThemedText style={styles.selectedName}>
                                {getCountryInfo(homeCountry).name}
                            </ThemedText>
                        </ThemedView>
                        <IconSymbol name="chevron.right" size={20} color="#666"/>
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView style={styles.settingContainer}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>타국 설정</ThemedText>
                    <TouchableOpacity
                        style={styles.countrySelector}
                        onPress={() => setShowForeignCountryPicker(true)}
                    >
                        <ThemedView style={styles.selectedCountry}>
                            <ThemedText style={styles.selectedFlag}>
                                {getCountryInfo(foreignCountry).flag}
                            </ThemedText>
                            <ThemedText style={styles.selectedName}>
                                {getCountryInfo(foreignCountry).name}
                            </ThemedText>
                        </ThemedView>
                        <IconSymbol name="chevron.right" size={20} color="#666"/>
                    </TouchableOpacity>
                </ThemedView>

                <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
                    <ThemedText style={styles.saveButtonText}>설정 저장</ThemedText>
                </TouchableOpacity>

                <ThemedView style={styles.infoContainer}>
                    <ThemedText style={styles.infoText}>
                        • 자국: 현재 거주하고 있는 국가를 선택하세요
                    </ThemedText>
                    <ThemedText style={styles.infoText}>
                        • 타국: 관심 있는 해외 국가를 선택하세요
                    </ThemedText>
                    <ThemedText style={styles.infoText}>
                        • 설정된 국가에 따라 맞춤형 콘텐츠가 제공됩니다
                    </ThemedText>
                </ThemedView>

                {showHomeCountryPicker && renderCountryPicker(
                    homeCountry,
                    setHomeCountry,
                    () => setShowHomeCountryPicker(false)
                )}

                {showForeignCountryPicker && renderCountryPicker(
                    foreignCountry,
                    setForeignCountry,
                    () => setShowForeignCountryPicker(false)
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    titleContainer: {
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 16,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.7,
        marginTop: 8,
    },
    settingContainer: {
        marginBottom: 24,
        backgroundColor: 'transparent',
    },
    sectionTitle: {
        marginBottom: 12,
        fontSize: 18,
        fontWeight: '600',
    },
    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 0.2)',
    },
    selectedCountry: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    selectedFlag: {
        fontSize: 32,
        marginRight: 12,
    },
    selectedName: {
        fontSize: 18,
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 32,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    infoContainer: {
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        padding: 16,
        borderRadius: 12,
        marginBottom: 32,
    },
    infoText: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4,
        opacity: 0.8,
    },
    pickerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    pickerScroll: {
        maxHeight: '70%',
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
    },
    countryOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    selectedOption: {
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
    },
    flag: {
        fontSize: 24,
        marginRight: 12,
    },
    countryName: {
        fontSize: 16,
        flex: 1,
        color: 'black',
    },
    closeButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
