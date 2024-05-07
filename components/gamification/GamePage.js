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

const GamePage = (props) => {

  const { ArrowleftIcon } = icons;

  const [refreshing, setRefreshing] = useState(false);
  const [diceModalVisible, setDiceModalVisible] = useState(false);
  const [curProgress, setCurProgress] = useState(1);
  const [curDiceNo, setCurDiceNo] = useState(1);
  const [done, setDone] = useState(0);
  const scrollViewRef = useRef(null);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [trophies, setTrophies] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [MyRank, setMyRank] = useState(0);
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    }
    catch (error) {
      console.log(error);
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
      const response = await axios(options);
      // console.log(response.data);
      setStreak(response.data.streak.consecutiveLoginDays);
      setCoins(response.data.streak.totalPoints);
      setTrophies(response.data.streak.trophies);
      setCurProgress(response.data.streak.totalPoints%50);
      setDone(response.data.streak.rolls);
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

  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
  // const leaders = [
  //   { trophies: 71, username: 'John Doe' },
  //   { trophies: 63, username: 'Harry Potter' },
  //   { trophies: 59, username: 'John Snow' },
  //   { trophies: 52, username: 'Super Mario' },
  //   { trophies: 50, username: 'Uncle Roger' },
  // ];
  const rules = [
    `The game board consists of 49 tiles arranged linearly, with each tile representing a step towards a milestone or progress towards achieving the goal.`,
    `Users' progress is incremented by 1 for each day they check in the app, and after maintaining a streak of 10 days, they receive additional movements based on a dice roll (1-5 extra movements).`,
    `The game can be started at any time, and each month follows the same process, with progress resetting at the end of each month, allowing users to start a new.`,
    `Achievements, such as maintaining a streak of 10 days or crossing a certain number of tiles, can be displayed on a leaderboard, fostering a competitive atmosphere and potentially earning users exclusive content or other prizes.`
  ];

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
    scrollViewRef.current?.scrollTo({ x: 980, animated: true });
  }

  const toLeaderboardSection = () => {
    scrollViewRef.current?.scrollTo({ x: 600, animated: true });
  }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white2}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white2} />

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
                    <View style={{ alignItems: 'center' }}>
                      <SkeletonPlaceholder.Item alignSelf='stretch' height={80} borderRadius={12} />
                    </View>
                    <SkeletonPlaceholder.Item alignSelf='stretch' height={300} borderRadius={12} />
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
                                <Star size={24} progress={curProgress/16} />
                                <Star size={32} progress={curProgress > 16? (curProgress-16)/17 : 0} />
                                <Star size={24} progress={curProgress > 33? (curProgress-33)/16 : 0} />
                              </View>
                              <View style={styles.horizontalLine} />
                            </View>
                            <Text style={{fontFamily: FONT.regular, fontSize: SIZES.small, color: COLORS.lightblue1}}>
                              {`(10 coins, 2 trophies) collected in this month`}
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
                    {tiles.map((tile) => (
                      <TouchableOpacity key={tile} 
                        style={{ position: 'relative', width: 35, height: 35, backgroundColor: curProgress >= tile? COLORS.white1 : COLORS.white3, borderRadius: 5, opacity: curProgress >= tile? 0.7 : 0.5 }}>
                          {curProgress===tile && (
                            <View style={styles.tileInnerImgContainer}>
                              <Image 
                                source={images.boy_gamer}
                                style={styles.tileInnerImg}
                              />
                            </View>
                          )}
                          {curProgress > tile && (
                            <View style={styles.tileInnerImgContainer}>
                              <Image 
                                source={images.tick}
                                style={styles.tileInnerImg}
                              />
                            </View>
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


        { !diceModalVisible && !loading && 
          <View style={{ position: 'absolute', bottom: 120, alignSelf: 'center' }}>
            <TouchableOpacity style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: COLORS.main2, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                if (!done) {
                  ToastAndroid.show('You need to maintain a streak of 10 days to roll the dice!!', 4);
                } else if (curProgress===49) {
                  ToastAndroid.show('You already crossed all the tiles!!', 4);
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
