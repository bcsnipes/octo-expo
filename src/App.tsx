import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'expo-status-bar';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

// Balance Screen Component
function BalanceScreen(): React.JSX.Element {
  const balances = [
    {id: '1', name: 'Cash', amount: 23, unit: '$', userOwes: true},
    {id: '2', name: 'Foot Rubs', amount: 1, unit: 'rub', userOwes: false},
  ];

  const partnerNames = {me: 'You', them: 'Partner'};

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.screenTitle}>Balance</Text>
      <ScrollView style={screenStyles.scrollContent}>
        {balances.map(balance => (
          <View key={balance.id} style={screenStyles.balanceCard}>
            <View style={screenStyles.balanceRow}>
              <Text style={screenStyles.balanceName}>{balance.name}</Text>
              <View style={screenStyles.balanceAmountContainer}>
                <Text
                  style={[
                    screenStyles.balanceAmount,
                    balance.userOwes
                      ? screenStyles.balanceNegative
                      : screenStyles.balancePositive,
                  ]}
                >
                  {balance.userOwes ? '-' : '+'}
                  {balance.amount} {balance.unit}
                </Text>
              </View>
            </View>
            <Text style={screenStyles.balanceSubtext}>
              {balance.userOwes
                ? `You owe ${partnerNames.them}`
                : `${partnerNames.them} owes you`}
            </Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

// Couple Screen Component
function CoupleScreen(): React.JSX.Element {
  const partner = {
    name: 'Yueyue',
    image: null, // Placeholder for avatar
    birthday: 'Sept 8',
    mbti: 'ISFJ',
    loveLanguages: ['Quality Time', 'Acts of Service', 'Physical Touch'],
  };

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.screenTitle}>Partner</Text>
      <ScrollView style={screenStyles.scrollContent}>
        {/* Partner Card */}
        <View style={coupleStyles.partnerCard}>
          {/* Avatar Placeholder */}
          <View style={coupleStyles.avatarContainer}>
            <View style={coupleStyles.avatar}>
              <Text style={coupleStyles.avatarText}>
                {partner.name.charAt(0)}
              </Text>
            </View>
          </View>

          {/* Name */}
          <Text style={coupleStyles.partnerName}>{partner.name}</Text>

          {/* Details Grid */}
          <View style={coupleStyles.detailsGrid}>
            <View style={coupleStyles.detailItem}>
              <Text style={coupleStyles.detailLabel}>Birthday</Text>
              <Text style={coupleStyles.detailValue}>{partner.birthday}</Text>
            </View>
            <View style={coupleStyles.detailItem}>
              <Text style={coupleStyles.detailLabel}>MBTI</Text>
              <Text style={coupleStyles.detailValue}>{partner.mbti}</Text>
            </View>
          </View>
        </View>

        {/* Love Languages Section */}
        <View style={coupleStyles.section}>
          <Text style={coupleStyles.sectionTitle}>Love Languages</Text>
          {partner.loveLanguages.map((language, index) => (
            <View key={index} style={coupleStyles.languageItem}>
              <View style={coupleStyles.languageDot} />
              <Text style={coupleStyles.languageText}>{language}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

// Add Infraction Modal Component (triggered by center button)
function AddInfractionScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Infraction</Text>
      <Text style={{color: '#666', marginTop: 10}}>
        Modal will slide up here
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

// History Screen Component
function HistoryScreen(): React.JSX.Element {
  const transactions = [
    {
      id: '1',
      penalty: 'Window Dressing',
      who: 'You',
      amount: '$5',
      date: '2 hours ago',
    },
    {
      id: '2',
      penalty: 'Dishes',
      who: 'Partner',
      amount: '$3',
      date: 'Yesterday',
    },
    {
      id: '3',
      penalty: 'Window Dressing',
      who: 'You',
      amount: '$5',
      date: '3 days ago',
    },
  ];

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.screenTitle}>History</Text>
      <ScrollView style={screenStyles.scrollContent}>
        {transactions.map(transaction => (
          <View key={transaction.id} style={screenStyles.transactionCard}>
            <View style={screenStyles.transactionRow}>
              <View>
                <Text style={screenStyles.transactionPenalty}>
                  {transaction.penalty}
                </Text>
                <Text style={screenStyles.transactionMeta}>
                  {transaction.who} • {transaction.date}
                </Text>
              </View>
              <Text style={screenStyles.transactionAmount}>
                {transaction.amount}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

// Setup Screen Component (Penalties & Price Types)
function SetupScreen(): React.JSX.Element {
  const [settingsModalVisible, setSettingsModalVisible] =
    React.useState<boolean>(false);
  const [addPriceModalVisible, setAddPriceModalVisible] =
    React.useState<boolean>(false);
  const [addPenaltyModalVisible, setAddPenaltyModalVisible] =
    React.useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  // Add Price Type form state
  const [priceName, setPriceName] = React.useState<string>('');
  const [priceLabel, setPriceLabel] = React.useState<string>('');
  const [labelPosition, setLabelPosition] = React.useState<string>('after');
  const [priceDescription, setPriceDescription] = React.useState<string>('');

  // Add Penalty form state
  const [penaltyName, setPenaltyName] = React.useState<string>('');
  const [penaltyDescription, setPenaltyDescription] =
    React.useState<string>('');
  const [penaltyPrice, setPenaltyPrice] = React.useState<string>('');
  const [penaltyCurrencyId, setPenaltyCurrencyId] = React.useState<string>('');

  const [penalties, setPenalties] = React.useState([
    {
      id: '1',
      name: 'Window Dressing',
      description: 'Leaving clothes around',
      price: 5,
      currencyId: '1',
    },
    {
      id: '2',
      name: 'Dishes',
      description: 'Not doing dishes',
      price: 3,
      currencyId: '1',
    },
  ]);

  const [priceTypes, setPriceTypes] = React.useState([
    {id: '1', name: 'Cash', label: '$', labelPosition: 'before'},
    {id: '2', name: 'Foot Rubs', label: 'rub', labelPosition: 'after'},
  ]);

  const handleSavePriceType = (): void => {
    if (!priceName.trim()) {
      return; // Don't save if name is empty
    }

    const newPriceType = {
      id: String(priceTypes.length + 1),
      name: priceName,
      label: priceLabel || priceName,
      labelPosition: labelPosition,
      description: priceDescription,
    };

    setPriceTypes([...priceTypes, newPriceType]);

    // Reset form
    setPriceName('');
    setPriceLabel('');
    setLabelPosition('after');
    setPriceDescription('');
    setAddPriceModalVisible(false);
  };

  const handleCancelPriceType = (): void => {
    // Reset form
    setPriceName('');
    setPriceLabel('');
    setLabelPosition('after');
    setPriceDescription('');
    setAddPriceModalVisible(false);
  };

  const handleSavePenalty = (): void => {
    if (!penaltyName.trim() || !penaltyPrice || !penaltyCurrencyId) {
      return; // Don't save if required fields are empty
    }

    const newPenalty = {
      id: String(penalties.length + 1),
      name: penaltyName,
      description: penaltyDescription,
      price: parseInt(penaltyPrice, 10),
      currencyId: penaltyCurrencyId,
    };

    setPenalties([...penalties, newPenalty]);

    // Reset form
    setPenaltyName('');
    setPenaltyDescription('');
    setPenaltyPrice('');
    setPenaltyCurrencyId('');
    setAddPenaltyModalVisible(false);
  };

  const handleCancelPenalty = (): void => {
    // Reset form
    setPenaltyName('');
    setPenaltyDescription('');
    setPenaltyPrice('');
    setPenaltyCurrencyId('');
    setAddPenaltyModalVisible(false);
  };

  return (
    <View style={screenStyles.container}>
      {/* Header with Settings Icon */}
      <View style={setupStyles.header}>
        <Text style={setupStyles.headerTitle}>Setup</Text>
        <Pressable
          style={setupStyles.settingsIcon}
          onPress={() => setSettingsModalVisible(true)}
        >
          <Ionicons name="settings-outline" size={24} color="#000" />
        </Pressable>
      </View>

      <ScrollView style={setupStyles.scrollContent}>
        {/* Penalties Section */}
        <View style={setupStyles.section}>
          <Text style={setupStyles.sectionTitle}>Penalties</Text>
          {penalties.map(penalty => {
            const currency = priceTypes.find(p => p.id === penalty.currencyId);
            return (
              <View key={penalty.id} style={setupStyles.listItem}>
                <View style={setupStyles.listItemContent}>
                  <Text style={setupStyles.listItemTitle}>{penalty.name}</Text>
                  <Text style={setupStyles.listItemSubtitle}>
                    {penalty.price} {currency?.label || ''}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </View>
            );
          })}
          <Pressable
            style={setupStyles.addButton}
            onPress={() => setAddPenaltyModalVisible(true)}
          >
            <Ionicons name="add-circle-outline" size={20} color="#000" />
            <Text style={setupStyles.addButtonText}>Add Penalty</Text>
          </Pressable>
        </View>

        {/* Price Types Section */}
        <View style={setupStyles.section}>
          <Text style={setupStyles.sectionTitle}>Price Types</Text>
          {priceTypes.map(priceType => (
            <View key={priceType.id} style={setupStyles.listItem}>
              <View style={setupStyles.listItemContent}>
                <Text style={setupStyles.listItemTitle}>{priceType.name}</Text>
                <Text style={setupStyles.listItemSubtitle}>
                  Label: {priceType.label} ({priceType.labelPosition})
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          ))}
          <Pressable
            style={setupStyles.addButton}
            onPress={() => setAddPriceModalVisible(true)}
          >
            <Ionicons name="add-circle-outline" size={20} color="#000" />
            <Text style={setupStyles.addButtonText}>Add Price Type</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            {/* Modal Header */}
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>App Settings</Text>
              <Pressable onPress={() => setSettingsModalVisible(false)}>
                <Ionicons name="close" size={28} color="#000" />
              </Pressable>
            </View>

            {/* Settings Content */}
            <ScrollView style={modalStyles.modalBody}>
              {/* Display Section */}
              <View style={modalStyles.section}>
                <Text style={modalStyles.sectionTitle}>Display</Text>
                <View style={modalStyles.settingRow}>
                  <View style={modalStyles.settingContent}>
                    <Text style={modalStyles.settingLabel}>Dark Mode</Text>
                    <Text style={modalStyles.settingDescription}>
                      Switch between light and dark theme
                    </Text>
                  </View>
                  <Switch
                    value={isDarkMode}
                    onValueChange={setIsDarkMode}
                    trackColor={{false: '#e5e5e5', true: '#000'}}
                    thumbColor="#fff"
                  />
                </View>
              </View>

              {/* Profile Section */}
              <View style={modalStyles.section}>
                <Text style={modalStyles.sectionTitle}>Your Profile</Text>
                <Pressable style={modalStyles.settingRow}>
                  <View style={modalStyles.settingContent}>
                    <Text style={modalStyles.settingLabel}>Name</Text>
                    <Text style={modalStyles.settingValue}>Brett</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </Pressable>
                <Pressable style={modalStyles.settingRow}>
                  <View style={modalStyles.settingContent}>
                    <Text style={modalStyles.settingLabel}>Birthday</Text>
                    <Text style={modalStyles.settingValue}>Nov 1</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </Pressable>
                <Pressable style={modalStyles.settingRow}>
                  <View style={modalStyles.settingContent}>
                    <Text style={modalStyles.settingLabel}>MBTI</Text>
                    <Text style={modalStyles.settingValue}>ISFJ</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </Pressable>
                <Pressable style={modalStyles.settingRow}>
                  <View style={modalStyles.settingContent}>
                    <Text style={modalStyles.settingLabel}>Love Languages</Text>
                    <Text style={modalStyles.settingValue}>3 selected</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </Pressable>
              </View>

              {/* About Section */}
              <View style={modalStyles.section}>
                <Text style={modalStyles.sectionTitle}>About</Text>
                <Pressable style={modalStyles.settingRow}>
                  <Text style={modalStyles.settingLabel}>Version</Text>
                  <Text style={modalStyles.settingValue}>1.0.0</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add Price Type Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addPriceModalVisible}
        onRequestClose={handleCancelPriceType}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            {/* Modal Header */}
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Add Price Type</Text>
              <Pressable onPress={handleCancelPriceType}>
                <Ionicons name="close" size={28} color="#000" />
              </Pressable>
            </View>

            {/* Form Content */}
            <ScrollView style={modalStyles.modalBody}>
              <View style={formStyles.formContainer}>
                {/* Name Field */}
                <View style={formStyles.fieldGroup}>
                  <Text style={formStyles.fieldLabel}>
                    Name <Text style={formStyles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={formStyles.textInput}
                    placeholder="e.g., RMB, Eating Out"
                    placeholderTextColor="#999"
                    value={priceName}
                    onChangeText={setPriceName}
                  />
                </View>

                {/* Label Field */}
                <View style={formStyles.fieldGroup}>
                  <Text style={formStyles.fieldLabel}>Label</Text>
                  <TextInput
                    style={formStyles.textInput}
                    placeholder="e.g., $, RMB, time"
                    placeholderTextColor="#999"
                    value={priceLabel}
                    onChangeText={setPriceLabel}
                  />
                  <Text style={formStyles.fieldHint}>
                    What displays with the number
                  </Text>
                </View>

                {/* Label Position Field */}
                <View style={formStyles.fieldGroup}>
                  <Text style={formStyles.fieldLabel}>Label Position</Text>
                  <View style={formStyles.radioGroup}>
                    <Pressable
                      style={formStyles.radioButton}
                      onPress={() => setLabelPosition('before')}
                    >
                      <View
                        style={[
                          formStyles.radioCircle,
                          labelPosition === 'before' &&
                            formStyles.radioCircleSelected,
                        ]}
                      >
                        {labelPosition === 'before' && (
                          <View style={formStyles.radioDot} />
                        )}
                      </View>
                      <Text style={formStyles.radioLabel}>Before</Text>
                    </Pressable>

                    <Pressable
                      style={formStyles.radioButton}
                      onPress={() => setLabelPosition('after')}
                    >
                      <View
                        style={[
                          formStyles.radioCircle,
                          labelPosition === 'after' &&
                            formStyles.radioCircleSelected,
                        ]}
                      >
                        {labelPosition === 'after' && (
                          <View style={formStyles.radioDot} />
                        )}
                      </View>
                      <Text style={formStyles.radioLabel}>After</Text>
                    </Pressable>
                  </View>
                  <Text style={formStyles.fieldHint}>
                    $10 (before) vs 10 RMB (after)
                  </Text>
                </View>

                {/* Description Field */}
                <View style={formStyles.fieldGroup}>
                  <Text style={formStyles.fieldLabel}>Description</Text>
                  <TextInput
                    style={[formStyles.textInput, formStyles.textArea]}
                    placeholder="Optional description"
                    placeholderTextColor="#999"
                    value={priceDescription}
                    onChangeText={setPriceDescription}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={formStyles.buttonContainer}>
              <Pressable
                style={formStyles.cancelButton}
                onPress={handleCancelPriceType}
              >
                <Text style={formStyles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  formStyles.saveButton,
                  !priceName.trim() && formStyles.saveButtonDisabled,
                ]}
                onPress={handleSavePriceType}
                disabled={!priceName.trim()}
              >
                <Text style={formStyles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Penalty Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addPenaltyModalVisible}
        onRequestClose={handleCancelPenalty}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            {/* Modal Header */}
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Add Penalty</Text>
              <Pressable onPress={handleCancelPenalty}>
                <Ionicons name="close" size={28} color="#000" />
              </Pressable>
            </View>

            {/* Form Content */}
            <ScrollView style={modalStyles.modalBody}>
              <View style={formStyles.formContainer}>
                {/* Name Field */}
                <View style={formStyles.fieldGroup}>
                  <Text style={formStyles.fieldLabel}>
                    Name <Text style={formStyles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={formStyles.textInput}
                    placeholder="e.g., Put back the chair"
                    placeholderTextColor="#999"
                    value={penaltyName}
                    onChangeText={setPenaltyName}
                  />
                </View>

                {/* Description Field */}
                <View style={formStyles.fieldGroup}>
                  <Text style={formStyles.fieldLabel}>Description</Text>
                  <TextInput
                    style={[formStyles.textInput, formStyles.textArea]}
                    placeholder="Optional description"
                    placeholderTextColor="#999"
                    value={penaltyDescription}
                    onChangeText={setPenaltyDescription}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                {/* Price Field */}
                <View style={formStyles.fieldGroup}>
                  <Text style={formStyles.fieldLabel}>
                    Price <Text style={formStyles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={formStyles.textInput}
                    placeholder="e.g., 1, 5, 10"
                    placeholderTextColor="#999"
                    value={penaltyPrice}
                    onChangeText={setPenaltyPrice}
                    keyboardType="numeric"
                  />
                </View>

                {/* Currency/Price Type Field */}
                <View style={formStyles.fieldGroup}>
                  <Text style={formStyles.fieldLabel}>
                    Price Type <Text style={formStyles.required}>*</Text>
                  </Text>
                  <Text style={formStyles.fieldHint}>
                    Select a price type (add more in Price Types section)
                  </Text>
                  <View style={formStyles.pickerContainer}>
                    {priceTypes.map(priceType => (
                      <Pressable
                        key={priceType.id}
                        style={[
                          formStyles.pickerOption,
                          penaltyCurrencyId === priceType.id &&
                            formStyles.pickerOptionSelected,
                        ]}
                        onPress={() => setPenaltyCurrencyId(priceType.id)}
                      >
                        <View
                          style={[
                            formStyles.radioCircle,
                            penaltyCurrencyId === priceType.id &&
                              formStyles.radioCircleSelected,
                          ]}
                        >
                          {penaltyCurrencyId === priceType.id && (
                            <View style={formStyles.radioDot} />
                          )}
                        </View>
                        <Text style={formStyles.pickerLabel}>
                          {priceType.name} ({priceType.label})
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={formStyles.buttonContainer}>
              <Pressable
                style={formStyles.cancelButton}
                onPress={handleCancelPenalty}
              >
                <Text style={formStyles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  formStyles.saveButton,
                  (!penaltyName.trim() ||
                    !penaltyPrice ||
                    !penaltyCurrencyId) &&
                    formStyles.saveButtonDisabled,
                ]}
                onPress={handleSavePenalty}
                disabled={
                  !penaltyName.trim() || !penaltyPrice || !penaltyCurrencyId
                }
              >
                <Text style={formStyles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

// Main App Component with Navigation
export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}): React.ReactNode => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Balance') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            } else if (route.name === 'Couple') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Add') {
              // Center button - special styling
              return (
                <View style={tabStyles.centerButton}>
                  <Ionicons name="add" size={28} color="#fff" />
                </View>
              );
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Setup') {
              iconName = focused ? 'list' : 'list-outline';
            } else {
              iconName = 'help-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            borderTopColor: '#f0f0f0',
            borderTopWidth: 1,
            height: 88,
            paddingBottom: 34,
            paddingTop: 8,
          },
        })}
      >
        <Tab.Screen name="Balance" component={BalanceScreen} />
        <Tab.Screen name="Couple" component={CoupleScreen} />
        <Tab.Screen
          name="Add"
          component={AddInfractionScreen}
          options={{
            tabBarLabel: '',
          }}
        />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Setup" component={SetupScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

// Screen Styles - Clean & Minimal
const screenStyles = StyleSheet.create({
  balanceAmount: {
    fontSize: 28,
    fontWeight: '700',
  },
  balanceAmountContainer: {
    flexDirection: 'row',
  },
  balanceCard: {
    backgroundColor: '#fafafa',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
  },
  balanceName: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  balanceNegative: {
    color: '#ef4444',
  },
  balancePositive: {
    color: '#10b981',
  },
  balanceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  balanceSubtext: {
    color: '#999',
    fontSize: 14,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  screenTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionAmount: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  transactionCard: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  transactionMeta: {
    color: '#999',
    fontSize: 13,
    marginTop: 4,
  },
  transactionPenalty: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  transactionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

// Tab Bar Styles
const tabStyles = StyleSheet.create({
  centerButton: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 28,
    elevation: 4,
    height: 56,
    justifyContent: 'center',
    marginTop: -28,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: 56,
  },
});

// Setup Screen Styles
const setupStyles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderColor: '#e5e5e5',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 16,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: '700',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  listItemContent: {
    flex: 1,
  },
  listItemSubtitle: {
    color: '#999',
    fontSize: 13,
    marginTop: 2,
  },
  listItemTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingsIcon: {
    padding: 8,
  },
});

// Couple Screen Styles
const coupleStyles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 50,
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  detailValue: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  detailsGrid: {
    flexDirection: 'row',
    marginTop: 24,
  },
  languageDot: {
    backgroundColor: '#000',
    borderRadius: 3,
    height: 6,
    marginRight: 12,
    marginTop: 7,
    width: 6,
  },
  languageItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  languageText: {
    color: '#000',
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
  },
  partnerCard: {
    backgroundColor: '#fff',
    borderColor: '#e5e5e5',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
    padding: 32,
  },
  partnerName: {
    color: '#000',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
});

// Modal Styles
const modalStyles = StyleSheet.create({
  modalBody: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    marginTop: 'auto',
    paddingBottom: 34,
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  modalTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 24,
    textTransform: 'uppercase',
  },
  settingContent: {
    flex: 1,
  },
  settingDescription: {
    color: '#999',
    fontSize: 13,
    marginTop: 2,
  },
  settingLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  settingRow: {
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  settingValue: {
    color: '#999',
    fontSize: 14,
    marginTop: 2,
  },
});

// Form Styles
const formStyles = StyleSheet.create({
  buttonContainer: {
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingBottom: 34,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    paddingVertical: 16,
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  fieldGroup: {
    marginBottom: 24,
  },
  fieldHint: {
    color: '#999',
    fontSize: 13,
    marginTop: 6,
  },
  fieldLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  radioDot: {
    backgroundColor: '#000',
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  radioButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 24,
  },
  radioCircle: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    marginRight: 8,
    width: 24,
  },
  radioCircleSelected: {
    borderColor: '#000',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  radioLabel: {
    color: '#000',
    fontSize: 16,
  },
  required: {
    color: '#ef4444',
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    paddingVertical: 16,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  textInput: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e5e5e5',
    borderRadius: 12,
    borderWidth: 1,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pickerContainer: {
    marginTop: 12,
  },
  pickerOption: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderColor: '#e5e5e5',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pickerOptionSelected: {
    backgroundColor: '#f0f0f0',
    borderColor: '#000',
  },
  pickerLabel: {
    color: '#000',
    fontSize: 16,
    marginLeft: 12,
  },
});
