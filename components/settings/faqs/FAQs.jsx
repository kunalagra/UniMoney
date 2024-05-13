import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './faqs.style';
import {COLORS, FONT, SHADOWS, icons} from '../../../constants';
import { ListItem } from '@rneui/themed';

const FAQs = (props) => {
  const {ArrowleftIcon} = icons;
  const [expanded, setExpanded] = useState(0); 
  const faqs = [
    {question: 'What is Unimoney', answer: `Unimoney is a unified platform for aggregating and analyzing financial activities. It aims to improve users' financial health by providing features such as unified financial tracking from multiple bank accounts, expense categorization and limits, SMS and passbook parsing, data visualization, gamification, and integrated split-wise and dues collection.`},
    {question: 'How can users get started with Unimoney?', answer: `Users can get started with Unimoney by signing up for an account on the platform's website. They can then connect their bank accounts, set up their preferences, and begin using the platform's features to manage their finances.`},
    {question: 'How does Unimoney work?', answer: `Unimoney works by securely connecting to users' bank accounts and parsing their financial data, including transactions, balances, and SMS messages. The platform categorizes expenses, sets limits, and provides visualizations to help users understand their spending patterns. It also encourages user engagement through gamification and offers split-wise and dues collection features.`},
    {question: 'Is Unimoney secure?', answer: `Yes, Unimoney is designed to be a secure platform. It parses SMS messages at the frontend only, ensuring that sensitive information is not stored in the database. The platform uses secure protocols and encryption to protect users' financial data.`},
    {question: 'What features does Unimoney offer?', answer: `Unimoney offers a range of features to help users manage their finances, including:\n•  Unified financial tracking from multiple bank accounts\n•  Expense categorization and limit setting\n•  SMS and passbook parsing\n•  Cash flow and spending pattern visualization\n•  Gamification to encourage user engagement\n•  Integrated split-wise and dues collection`},
    {question: 'Can Unimoney be used for business or personal finance?', answer: `Unimoney can be used for both business and personal finance. The platform's features can be tailored to suit the needs of individuals, small businesses, and large enterprises.`},
    {question: 'How much does Unimoney cost?', answer: `Unimoney offers a range of pricing plans to suit different users' needs. Currently, the platform offers all the features for absolutely free, but it can come up with additional features for paid subscriptions in the future.`},
  ]

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white2}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white2} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <ArrowleftIcon style={styles.arrowleftIcon} fill={COLORS.gray3} />
            </TouchableOpacity>
            <View>
              <Text style={styles.navHeader}>FAQs</Text>
            </View>
          </View>

          <View style={styles.mainContainer}>
            {faqs.map((faq, index) => (
              <View style={{ ...SHADOWS.small, borderRadius: 12 }} key={index}>
                <ListItem.Accordion
                  content={
                    <>
                      <ListItem.Content>
                        <ListItem.Title style={{ fontFamily: FONT.medium }}>
                          {faq.question}
                        </ListItem.Title>
                      </ListItem.Content>
                    </>
                  }
                  isExpanded={expanded===index}
                  onPress={() => {
                    if (expanded===index) setExpanded(-1);
                    else setExpanded(index);
                  }}
                  containerStyle={[{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }, !(expanded===index) && { borderRadius: 12 }]}
                >
                  <View style={{ backgroundColor: COLORS.white1, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                    <ListItem.Content>
                      <ListItem.Subtitle style={{ fontFamily: FONT.regular }}>
                        {faq.answer}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </View>
                </ListItem.Accordion>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQs;
