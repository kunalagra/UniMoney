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

const FAQs = () => {
  const {ArrowleftIcon} = icons;
  const [expanded, setExpanded] = useState(0); 
  const faqs = [
    {question: 'What is Unimoney', answer: 'Yes yes yes'},
    {question: 'What is this', answer: 'Yes yes yes'},
    {question: 'What is that', answer: 'Yes yes yes'},
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
              <View style={{ ...SHADOWS.medium, borderRadius: 12 }} key={index}>
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
