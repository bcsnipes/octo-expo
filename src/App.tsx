import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
  const penalties = [
    {id: '1', name: 'Window Dressing', priceCount: 1},
    {id: '2', name: 'Dishes', priceCount: 2},
    {id: '3', name: 'Late to Dinner', priceCount: 1},
  ];

  const priceTypes = [
    {id: '1', name: 'Cash', unit: '$'},
    {id: '2', name: 'Foot Rubs', unit: 'rub'},
  ];

  return (
    <View style={screenStyles.container}>
      {/* Header with Settings Icon */}
      <View style={setupStyles.header}>
        <Text style={setupStyles.headerTitle}>Setup</Text>
        <View style={setupStyles.settingsIcon}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </View>
      </View>

      <ScrollView style={setupStyles.scrollContent}>
        {/* Penalties Section */}
        <View style={setupStyles.section}>
          <Text style={setupStyles.sectionTitle}>Penalties</Text>
          {penalties.map(penalty => (
            <View key={penalty.id} style={setupStyles.listItem}>
              <View style={setupStyles.listItemContent}>
                <Text style={setupStyles.listItemTitle}>{penalty.name}</Text>
                <Text style={setupStyles.listItemSubtitle}>
                  {penalty.priceCount} price{penalty.priceCount > 1 ? 's' : ''}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          ))}
          <View style={setupStyles.addButton}>
            <Ionicons name="add-circle-outline" size={20} color="#000" />
            <Text style={setupStyles.addButtonText}>Add Penalty</Text>
          </View>
        </View>

        {/* Price Types Section */}
        <View style={setupStyles.section}>
          <Text style={setupStyles.sectionTitle}>Price Types</Text>
          {priceTypes.map(priceType => (
            <View key={priceType.id} style={setupStyles.listItem}>
              <View style={setupStyles.listItemContent}>
                <Text style={setupStyles.listItemTitle}>{priceType.name}</Text>
                <Text style={setupStyles.listItemSubtitle}>
                  Unit: {priceType.unit}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          ))}
          <View style={setupStyles.addButton}>
            <Ionicons name="add-circle-outline" size={20} color="#000" />
            <Text style={setupStyles.addButtonText}>Add Price Type</Text>
          </View>
        </View>
      </ScrollView>
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
