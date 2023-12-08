import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons, COLORS } from '../../constants';
import HomePage from './home/HomePage';
import HistoryPage from './history/HistoryPage';
import InsightsPage from './insights/InsightsPage';
import BudgetPage from './budget/BudgetPage';
import styles from './mainpage.style';


const Tab = createBottomTabNavigator();

const MainPage = (props) => {

    const { HomeIcon, HistoryIcon, AnalysisIcon, SavingsIcon } = icons;

    return (
        <Tab.Navigator
            backBehavior='none'
            screenOptions={{
                tabBarStyle: styles.tabBarStyle,
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarActiveTintColor: COLORS.main3,
                tabBarInactiveTintColor: COLORS.gray3,
                headerShown: false
            }}
        >
            <Tab.Screen name="Home" children={() => <HomePage navigateTo={props.navigation.navigate} />}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <HomeIcon
                                fill="transparent"
                                resizeMode="contain"
                                style={styles.iconStrokeStyle(25, 25, focused)}
                            ></HomeIcon>
                        )
                    },
                }}
            />
            <Tab.Screen name="History" children={() => <HistoryPage navigateTo={props.navigation.navigate} />}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <HistoryIcon
                                resizeMode="contain"
                                style={styles.iconStrokeStyle(55, 55, focused)}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen name="Insights" component={InsightsPage}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AnalysisIcon
                                resizeMode="contain"
                                style={styles.iconFillStyle(25, 25, focused)}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen name="Budget" component={BudgetPage}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <SavingsIcon
                                resizeMode="contain"
                                style={styles.iconFillStyle(25, 25, focused)}
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}




export default MainPage;
