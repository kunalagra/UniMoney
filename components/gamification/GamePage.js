import { RefreshControl, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View, Text, Image, ToastAndroid } from "react-native";
import styles from "./gamepage.style";
import { COLORS, FONT, SIZES, SHADOWS, icons, images } from "../../constants";
import { useCallback, useEffect, useRef, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Dialog } from "@rneui/themed";
import { REACT_APP_BACKEND_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import MonthPicker from "react-native-month-year-picker";

const GamePage = (props) => {

  const { ArrowleftIcon } = icons;
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [curDate, setCurDate] = useState(date);
  const [refreshing, setRefreshing] = useState(false);
  const [diceModalVisible, setDiceModalVisible] = useState(false);
  const [curProgress, setCurProgress] = useState(0);
  const [curDiceNo, setCurDiceNo] = useState(1);
  const [done, setDone] = useState(0);
  const scrollViewRef = useRef(null);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [trophies, setTrophies] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [MyRank, setMyRank] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tiles, setTiles] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [curMonthCoins, setCurMonthCoins] = useState(0);
  const [curMonthTrophies, setCurMonthTrophies] = useState(0);
  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);

  const noOfDaysInMonth = new Date(curDate.getMonth()+1, curDate.getFullYear(), 0).getDate();
  const starTimePeriod = Math.ceil(noOfDaysInMonth/3);


  const onValueChange = (event, newDate) => {
    setIsMonthModalOpen(false);
    const selectedDate = newDate || new Date(curDate);
    setCurDate(selectedDate);
  };

  const prevMonth = () => {
    if (curDate.getMonth()!==0) setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1));
    else setCurDate(new Date(curDate.getFullYear()-1, 11));
  }

  const nextMonth = () => {
    if (curDate.getMonth()!==11) setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1));
    else setCurDate(new Date(curDate.getFullYear()+1, 0));
  }

  const onRefresh = useCallback(() => {
      setRefreshing(true);
      fetchStreak();
      setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const fetchLeaderboard = async () => {
    const options = {
      method: 'GET',
      url: `${REACT_APP_BACKEND_URL}/streak/leaderboard`,
      headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + await AsyncStorage.getItem('token')
      }
    }
    try {
      const response = await axios(options);
      setLeaderboard(response.data.top5);
      setMyRank(response.data.currentRank);
    }
    catch (error) {
      console.log(error);
    } 
    finally {
      setLoading(false);
    }
  }

  const fetchStreak = async () => {
    const options = {
      method: 'GET',
      url: `${REACT_APP_BACKEND_URL}/streak/`,
      headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + await AsyncStorage.getItem('token')
      }
  }
  try {
      // const response = await axios(options);
      // console.log(response.data);
      // console.log(response.data);
      // setStreak(response.data.streak.consecutiveLoginDays);
      // setCoins(response.data.streak.totalPoints);
      // setTrophies(response.data.streak.trophies);
      // setCurProgress(response.data.streak.totalPoints%50);
      // setDone(response.data.streak.rolls);

      /* 
        for input:

        Store the previous 10 months only for optimisation if needed.
        month - curDate.getMonth()
        year - curDate.getFullYear()
      
      */

      const response = {
        data: {
          streak: {
            _id: "663f3dd85b8ed59a52f1d400",
            name: "Kunal",
            totalPoints: 24,
            consecutiveLoginDays: 13,
            rolls: 0,
            trophies: 0,
            month: 'June',
            loggedInDays: [1,0,1,1,1,1,1,1,2,1,1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          }
        }
      }

      const blocks = [...response.data.streak.loggedInDays];
      let lastOne = 0, curCoins = 0, curTrophies = 0;
      for (let i=0; i < noOfDaysInMonth-1; i++) {
        if (blocks[i] >= 1) {
          lastOne = i+1; curCoins++;
          if (blocks[i]===2) curTrophies++;
          if (blocks[i] >= 3) curCoins += blocks[i] - 3;
        }
      }

      setCurMonthCoins(curCoins);
      setCurMonthTrophies(curTrophies);
      setCurProgress(lastOne);
      setTiles(blocks);
      setStreak(response.data.streak.consecutiveLoginDays);
      setCoins(response.data.streak.totalPoints);
      setTrophies(response.data.streak.trophies);
      setDone(response.data.streak.rolls);

      if (response.data.streak.consecutiveLoginDays!==0 && response.data.streak.consecutiveLoginDays % 7 === 0) {
        ToastAndroid.show('Yayy!! You earned a trophy for maintaining a 7-day streak!', 4);
      }
      if (response.data.streak.consecutiveLoginDays!==0 && response.data.streak.consecutiveLoginDays % 10 === 0) {
        ToastAndroid.show(`It's 10-day streak already, Roll the dice!!`, 4);
      }
      fetchLeaderboard();
  }
  catch (error) {
      console.log(error);
  }
  }

  useEffect(() => {
    setLoading(true);
  fetchStreak();
  }, []);

  const getRandomDiceNo = () => {
    const num = Math.floor(Math.random() * 6 + 1);
    setCurDiceNo(num);
    return num;
  }

  const rules = [
    `The game board consists of tiles, arranged linearly, according to the number of days in the current month, with each tile representing a day towards a milestone or progress towards achieving the goal.`,
    `Users' progress is incremented by 1, and they receive one unicoin for each day they check in the app.`,
    `After maintaining a streak of 7 days, they receive a trophy as a reward.`,
    `After maintaining a streak of 10 days, they receive additional coins (unicoins) based on a dice roll between 1 and 6.`,
    `The game can be started at any time, and each month follows the same process, with progress resetting at the end of each month, allowing users to start anew.`,
    `Achievements, such as maintaining a streak of 10 days or the current streak, can be displayed on a leaderboard, fostering a competitive atmosphere.`,
    `We will be adding some exclusive rewards at a cost of unicoins soon.`,
] ;

  const StatView = ({ image, stat, title, size=16 }) => {
    return (
      <View style={styles.statContainer}>
        <Image 
          source={image}
          alt={title}
          style={styles.statImage(size)}
        />
        <Text style={styles.statContainerText}>
          {stat}
        </Text>
      </View>
    )
  }

  const LeaderboardRowCard = ({ rank, username, trophies }) => {

    const colors = ['gold','silver','skyblue','skyblue','skyblue'];

    return (
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, borderBottomWidth: 2, borderBottomColor: colors[rank-1], ...SHADOWS.small }}>
        <Text style={styles.leaderboardRowText}>
          {rank}
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Text style={styles.leaderboardRowText}>
            {username}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 7, alignItems: 'center' }}>
          <Image 
            source={images.trophy}
            alt={'trophies'}
            style={{ width: 18, height: 18, objectFit: 'contain' }}
          />
          <Text style={styles.leaderboardRowText}>
            {trophies}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const Star = ({ size, progress }) => {
    return (
      <View style={{ position: 'relative', flexDirection: 'row' }}>
        <Image
          source={images.star_filled}
          style={styles.backStarImg(size)}
        />
        <View style={styles.frontStarContainer}>
          <View style={styles.frontStarProgressContainer(progress)}>
            <Image
              source={images.star_filled}
              style={styles.frontStarImg(size)}
            />
          </View>
        </View>
    </View>
    )
  }

  const toRulesSection = () => {
    scrollViewRef.current?.scrollTo({ x: 860, animated: true });
  }

  const toLeaderboardSection = () => {
    scrollViewRef.current?.scrollTo({ x: 500, animated: true });
  }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white2}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white2} />

      {isMonthModalOpen && (
          <MonthPicker
              onChange={onValueChange}
              value={curDate}
              minimumDate={new Date(2014, 1)}
              maximumDate={new Date(date.getFullYear(), date.getMonth())}
              locale="en"
          />
      )}

      <View style={styles.sectionContainer}>
        <View style={styles.mainContainer}>
          <TouchableOpacity style={styles.navbar} onPress={() => props.navigation.navigate('Main')}>
              <ArrowleftIcon style={styles.arrowLeftIcon} fill={COLORS.gray3} />
            <View>
              <Text style={styles.navHeading}>Back to Home</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.container}>
            { loading ? 
              <SkeletonPlaceholder borderRadius={4} direction='right'>
                <SkeletonPlaceholder.Item gap={15}>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }}>
                        <SkeletonPlaceholder.Item width={80} height={40} borderRadius={12} />
                        <SkeletonPlaceholder.Item width={100} height={40} borderRadius={12} />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                        <SkeletonPlaceholder.Item width={120} height={40} borderRadius={12} />
                      <View style={{ flexDirection: 'row', gap: 10 }}>
                        <SkeletonPlaceholder.Item width={40} height={40} borderRadius={100} />
                        <SkeletonPlaceholder.Item width={40} height={40} borderRadius={100} />
                        <SkeletonPlaceholder.Item width={40} height={40} borderRadius={100} />
                      </View>
                    </View>
                    <SkeletonPlaceholder.Item alignSelf='stretch' height={40} borderRadius={12} />
                    <View style={{ alignItems: 'center' }}>
                      <SkeletonPlaceholder.Item alignSelf='stretch' height={80} borderRadius={12} />
                    </View>
                    <SkeletonPlaceholder.Item alignSelf='stretch' height={200} borderRadius={12} />
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <SkeletonPlaceholder.Item width={200} height={40} borderRadius={12} />
                        <SkeletonPlaceholder.Item width={70} height={40} borderRadius={8} />
                    </View>
                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                    <SkeletonPlaceholder.Item alignSelf='stretch' height={60} borderRadius={12} />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            : 
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
              }
            >
              <View style={styles.scrollViewInnerContainer}>
                <View style={styles.gameSectionsContainer}>
                  <TouchableOpacity style={styles.rulesButton}
                    onPress={toRulesSection}
                  >
                    <Image 
                      source={images. question_mark}
                      style={styles.rulesButtonImg}
                    />
                    <Text style={styles.rulesButtonText}>
                      Rules
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.leaderboardButton}
                    onPress={toLeaderboardSection}
                  >
                    <Image 
                      source={images.leaderboard}
                      style={styles.leaderboardButtonImg}
                    />
                    <Text style={styles.leaderboardButtonText}>
                      Leaderboard
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>
                  <Text style={styles.statsHeading}>
                    Stats
                  </Text>
                  <View style={styles.statsInnerContainer}>
                    <StatView image={images.flame} title={'streak'} stat={streak} size={23} />
                    <StatView image={images.coin} title={'coins'} stat={coins} />
                    <StatView image={images.trophy} title={'trophies'} stat={trophies} size={20} />
                  </View>
                </View>

                <View style={styles.datesContainer}>
                  <TouchableOpacity onPress={prevMonth}>
                      <Text style={styles.arrowText}>
                          {'<'}
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  >
                      <Text style={styles.dateHeading}>
                          {months[curDate.getMonth()]} {curDate.getFullYear()}
                      </Text>
                  </TouchableOpacity>
                  <View style={styles.headingIconsContainer}>
                      <TouchableOpacity onPress={nextMonth} disabled={curDate.getMonth()===date.getMonth() && curDate.getFullYear()===date.getFullYear()}>
                          <Text style={styles.arrowText}>
                              {'>'}
                          </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => setIsMonthModalOpen(true)}
                      >
                          <Image
                              source={images.calendar} 
                              style={styles.calendarIcon}
                          />
                      </TouchableOpacity>
                  </View>
                </View>

                <View style={{}}>
                  <TouchableOpacity 
                      style={styles.starProgressContainer}
                      activeOpacity={0.8}
                  >
                      <LinearGradient
                          colors={[ COLORS.purple2, COLORS.purple1, COLORS.purple1, COLORS.purple2 ]}
                          style={styles.starProgressGradientContainer}
                          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                      >
                          <View style={{ gap: 10, alignItems: 'center' }}>
                            <View style={{ gap: 10, alignItems: 'flex-end', flexDirection: 'row' }}>
                              <View style={styles.horizontalLine} />
                              <View style={styles.starsContainer}>
                                <Star size={24} progress={curProgress / starTimePeriod} />
                                <Star size={32} progress={curProgress > starTimePeriod? (curProgress - starTimePeriod)/starTimePeriod : 0} />
                                <Star size={24} progress={curProgress > (2*starTimePeriod)? (curProgress - 2*starTimePeriod)/starTimePeriod : 0} />
                              </View>
                              <View style={styles.horizontalLine} />
                            </View>
                            <Text style={{fontFamily: FONT.regular, fontSize: SIZES.small, color: COLORS.lightblue1}}>
                              {`(${curMonthCoins} coins, ${curMonthTrophies} trophies) collected in this month`}
                            </Text>
                          </View>
                      </LinearGradient>
                  </TouchableOpacity>
                </View>

                <LinearGradient
                  colors={[ '#B83D00', '#FF7733', '#FF7733', '#B83D00' ]}
                  start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                  style={styles.tilesGradientContainer}>
                  <View style={styles.tilesContainer}>
                    {tiles.map((tile, index) => (
                      <TouchableOpacity key={index} 
                        style={{ position: 'relative', width: 35, height: 35, backgroundColor: tile >= 1? COLORS.white1 : COLORS.white3, borderRadius: 5, opacity: tile >= 1? 0.7 : 0.5 }}>
                          {(curProgress-1)===index && (
                            <View style={styles.tileInnerImgContainer}>
                              <Image 
                                source={images.boy_gamer}
                                style={styles.tileInnerImg}
                              />
                            </View>
                          )}
                          {(curProgress-1) > index && (
                            tile >= 1?
                            tile===2? (
                              <View style={styles.tileInnerImgContainer}>
                                <Image 
                                  source={images.trophy}
                                  style={styles.tileInnerImg}
                                />
                              </View>  
                              ) : 
                              tile >= 3? (
                                <View style={styles.tileInnerImgContainer}>
                                  <Image 
                                    source={images.dice6}
                                    style={[styles.tileInnerImg, { tintColor: COLORS.main3 }]}
                                  />
                                </View>  
                              ) : (
                                <View style={styles.tileInnerImgContainer}>
                                  <Image 
                                    source={images.tick}
                                    style={styles.tileInnerImg}
                                  />
                                </View> 
                            ) : (
                              <></>
                            )
                          )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </LinearGradient>

                <View style={styles.myRankContainer}>
                  <View style={styles.trophyHeadingContainer}>
                    <Image 
                      source={images.trophy}
                      style={styles.rankImg}
                    />
                    <Text style={styles.rankHeading}>
                      My Rank
                    </Text>
                  </View>
                  <Text style={styles.rankNumber}>
                    # {MyRank}
                  </Text>
                </View>

                <View style={styles.gameDetailSectionContainer}>
                  <View style={styles.gameDetailSectionHeadingContainer}>
                    <Image 
                      source={images.leaderboard}
                      style={styles.gameDetailSectionTrophyImg}
                    />
                    <Text style={styles.gameDetailSectionHeading}>
                      Leaderboard
                    </Text>
                  </View>
                  {leaderboard.map((member, index) => (
                    <LeaderboardRowCard 
                      key={index}
                      rank={index+1}
                      username={member.name}
                      trophies={member.trophies}
                    />
                  ))}
                </View>

                <View style={styles.gameDetailSectionContainer}>
                  <View style={styles.gameDetailSectionHeadingContainer}>
                    <Image 
                      source={images.question_mark}
                      style={styles.gameDetailSectionRulesImg}
                    />
                    <Text style={styles.gameDetailSectionHeading}>
                      Rules
                    </Text>
                  </View>
                  <View style={{ gap: 8 }}>
                    {rules.map((rule, index) => (
                      <Text key={index} style={styles.ruleText}>
                        {`\u2022 ${rule}`}
                      </Text>
                    ))}
                  </View>
                </View>

              </View>
            </ScrollView>
             }
          </View>
        </View>


        { !diceModalVisible && !loading && !(curProgress===noOfDaysInMonth) &&
          <View style={{ position: 'absolute', bottom: 120, alignSelf: 'center' }}>
            <TouchableOpacity style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: COLORS.main2, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                if (!done) {
                  ToastAndroid.show(`Maintain a streak of ${10 - (streak%10)} days more to roll the dice!!`, 4);
                } else {
                  setDiceModalVisible(true); getRandomDiceNo();
                }
              }}
              >
              <View style={{ width: 44, height: 44, position: 'relative', backgroundColor: COLORS.white1, borderRadius: 10 }}>
                <Image 
                  source={images.dice6}
                  style={{ width: 44, height: 44, objectFit: 'contain', position: 'absolute', top: 0, left: 0, tintColor: COLORS.main3 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        } 
      </View>

      <Dialog
        animationType="slide"
        transparent={true}
        isVisible={diceModalVisible}
        onRequestClose={() => {
            setDiceModalVisible(false);
            setCurProgress(prev => Math.min(49, prev+curDiceNo));
        }}
        overlayStyle={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', elevation: 0 }}
        onBackdropPress={() => {
          setDiceModalVisible(false);
          setCurProgress(prev => Math.min(49, prev+curDiceNo));
        }}
      >
        <View style={{ width: 140, height: 140, position: 'relative', backgroundColor: COLORS.white1, borderRadius: 20 }}>
          <Image 
            source={images[`dice${curDiceNo}`]}
            style={{ width: 150, height: 150, objectFit: 'contain', position: 'absolute', top: -5, left: -5, tintColor: COLORS.main3 }}
          />
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

export default GamePage;
