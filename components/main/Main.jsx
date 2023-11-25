import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from '../../constants';
import Home from '../main/home/HomePage';
import Budget from '../main/budget/BudgetPage';
import History from '../main/history/HistoryPage';
import Insights from '../main/insights/InsightsPage';
import Settings from '../main/settings/SettingsPage';
import { COLORS } from '../../constants';


const Tab = createBottomTabNavigator();

const Main = () => {

    const { HomeIcon, HistoryIcon, SettingsIcon, AnalysisIcon, SavingsIcon } = icons;

    return (
        <Tab.Navigator
            backBehavior='none'
            screenOptions={{
                tabBarStyle: {
                    height: 55,
                    borderRadius: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: -8,
                    paddingBottom: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                },
                tabBarActiveTintColor: COLORS.main3,
                tabBarInactiveTintColor: COLORS.black,
            }}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <HomeIcon
                                fill="transparent"
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    stroke: focused ? COLORS.main3 : COLORS.black,
                                }}

                            ></HomeIcon>
                        )
                    },
                    tabBarActiveTintColor: '#00B899',
                }}
            />
            <Tab.Screen name="History" component={History}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <HistoryIcon
                                resizeMode="contain"
                                style={{
                                    width: 48,
                                    height: 48,
                                    stroke: focused ? COLORS.main3 : COLORS.black,
                                }}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen name="Budget" component={Budget}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AnalysisIcon
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    fill: focused ? COLORS.main3 : COLORS.black,
                                }}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen name="Insights" component={Insights}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <SavingsIcon
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    fill: focused ? COLORS.main3 : COLORS.black,
                                }}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen name="Settings" component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <SettingsIcon
                                fill="transparent"
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    stroke: focused ? COLORS.main3 : COLORS.black,
                                }}
                            ></SettingsIcon>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}




export default Main;
