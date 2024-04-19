import { RefreshControl, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./gamepage.style";
import { COLORS, FONT, SIZES, SHADOWS, icons, images } from "../../constants";
import { useCallback, useState } from "react";
import LinearGradient from "react-native-linear-gradient";

const GamePage = (props) => {

  const { ArrowleftIcon, StarFilled } = icons;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
  const leaders = [
    { trophies: 71, username: 'John Doe' },
    { trophies: 63, username: 'Harry Potter' },
    { trophies: 59, username: 'John Snow' },
    { trophies: 52, username: 'Super Mario' },
    { trophies: 50, username: 'Uncle Roger' },
  ];
  const rules = [
    `The game board consists of 49 tiles arranged linearly, with each tile representing a step towards a milestone or progress towards achieving the goal.`,
    `Users' progress is incremented by 1 for each day they check in the app, and after maintaining a streak of 10 days, they receive additional movements based on a dice roll (1-5 extra movements).`,
    `The game can be started at any time, and each month follows the same process, with progress resetting at the end of each month, allowing users to start a new.`,
    `Achievements, such as maintaining a streak of 10 days or crossing a certain number of tiles, can be displayed on a leaderboard, fostering a competitive atmosphere and potentially earning users exclusive content or other prizes.`
  ];

  const curProgress = 38;

  const StatView = ({ image, stat, title }) => {
    return (
      <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
        <Image 
          source={image}
          alt={title}
          style={{ width: 16, height: 16, objectFit: 'contain' }}
        />
        <Text style={{fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.gray3}}>
          {stat}
        </Text>
      </View>
    )
  }

  const LeaderboardRowCard = ({ rank, username, trophies }) => {

    const colors = ['gold','silver','skyblue','skyblue','skyblue'];

    return (
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, borderBottomWidth: 2, borderBottomColor: colors[rank-1], ...SHADOWS.small }}>
        <Text style={{fontFamily: FONT.medium2, fontSize: SIZES.medium, color: COLORS.gray3}}>
          {rank}
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Text style={{fontFamily: FONT.medium2, fontSize: SIZES.medium, color: COLORS.gray3}}>
            {username}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 7, alignItems: 'center' }}>
          <Image 
            source={images.category}
            alt={'trophies'}
            style={{ width: 16, height: 16, objectFit: 'contain' }}
          />
          <Text style={{fontFamily: FONT.medium2, fontSize: SIZES.medium, color: COLORS.gray3}}>
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
          style={{ width: size, height: size, tintColor: COLORS.white1, opacity: 0.5 }}
        />
        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <View style={{ width: 0, height: '100%', overflow: 'hidden', paddingRight: `${progress * 100}%` }}>
            <Image
              source={images.star_filled}
              style={{ width: size, height: size, tintColor: COLORS.gold1 }}
            />
          </View>
        </View>
    </View>
    )
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.main3]} />
                }
            >
              <View style={{ width: '100%', gap: 20, paddingBottom: 200 }}>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'flex-end' }}>
                  <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image 
                      source={images.category}
                      style={{ width: 16, height: 16, objectFit: 'contain' }}
                    />
                    <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.gray2}}>
                      Rules
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image 
                      source={images.category}
                      style={{ width: 16, height: 16, objectFit: 'contain' }}
                    />
                    <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.gray2}}>
                      Leaderboard
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                  <Text style={{fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.gray3}}>
                    Stats
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <StatView image={images.category} title={'streak'} stat={5} />
                    <StatView image={images.category} title={'coins'} stat={48} />
                    <StatView image={images.category} title={'trophies'} stat={17} />
                  </View>
                </View>

                <View style={{}}>
                  <TouchableOpacity 
                      style={{ borderRadius: 10, elevation: 10, ...SHADOWS.medium, }}
                      activeOpacity={0.8}
                  >
                      <LinearGradient
                          colors={[ COLORS.purple2, COLORS.purple1, COLORS.purple1, COLORS.purple2 ]}
                          style={{ width: '100%', paddingHorizontal: 8, paddingVertical: 10, borderRadius: 10 }}
                          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                      >
                          <View style={{ gap: 10, alignItems: 'center' }}>
                            <View style={{ gap: 10, alignItems: 'flex-end', flexDirection: 'row' }}>
                              <View style={{ height: 0, borderWidth: 0.6, borderColor: COLORS.lightblue1, width: '20%' }} />
                              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Star size={24} progress={curProgress/16} />
                                <Star size={32} progress={curProgress > 16? (curProgress-16)/17 : 0} />
                                <Star size={24} progress={curProgress > 33? (curProgress-33)/16 : 0} />
                              </View>
                              <View style={{ height: 0, borderWidth: 0.6, borderColor: COLORS.lightblue1, width: '20%' }} />
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
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', paddingHorizontal: 8, paddingVertical: 10, borderRadius: 10 }}>
                  <View style={{ width: 305, height: 305, flexDirection: 'row', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    {tiles.map((tile) => (
                      <TouchableOpacity key={tile} 
                        style={{ position: 'relative', width: 35, height: 35, backgroundColor: curProgress >= tile? COLORS.white1 : COLORS.white3, borderRadius: 5, opacity: curProgress >= tile? 0.7 : 0.5 }}>
                          {curProgress===tile && (
                            <View style={{ position: 'absolute', top: 0, left: 0}}>
                              <Image 
                                source={images.category}
                                style={{ width: 34, height: 34, objectFit: 'contain' }}
                              />
                            </View>
                          )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </LinearGradient>

                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                    <Image 
                      source={images.category}
                      style={{ width: 16, height: 16, objectFit: 'contain' }}
                    />
                    <Text style={{fontFamily: FONT.medium, fontSize: SIZES.large, color: COLORS.gray3}}>
                      My Rank
                    </Text>
                  </View>
                  <Text style={{fontFamily: FONT.medium, fontSize: SIZES.large, color: COLORS.gray3}}>
                    # 123
                  </Text>
                </View>

                <View style={{ marginTop: 10, gap: 14 }}>
                  <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                    <Image 
                      source={images.category}
                      style={{ width: 16, height: 16, objectFit: 'contain' }}
                    />
                    <Text style={{fontFamily: FONT.medium, fontSize: SIZES.large, color: COLORS.gray3}}>
                      Leaderboard
                    </Text>
                  </View>
                  {leaders.map((member, index) => (
                    <LeaderboardRowCard 
                      key={index}
                      rank={index+1}
                      username={member.username}
                      trophies={member.trophies}
                    />
                  ))}
                </View>

                <View style={{ marginTop: 10, gap: 14 }}>
                  <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                    <Image 
                      source={images.category}
                      style={{ width: 16, height: 16, objectFit: 'contain' }}
                    />
                    <Text style={{fontFamily: FONT.medium, fontSize: SIZES.large, color: COLORS.gray3}}>
                      Rules
                    </Text>
                  </View>
                  <View style={{ gap: 8 }}>
                    {rules.map((rule, index) => (
                      <Text key={index} style={{fontFamily: FONT.regular, fontSize: SIZES.regular, color: COLORS.gray3}}>
                        {`\u2022 ${rule}`}
                      </Text>
                    ))}
                  </View>
                </View>

              </View>
            </ScrollView>
          </View>
        </View>

        <View style={{ position: 'absolute', bottom: 120, left: '38%' }}>
          <TouchableOpacity style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: COLORS.main2, justifyContent: 'center', alignItems: 'center' }}>
            <Image 
              source={images.category}
              style={{ width: 64, height: 64, objectFit: 'contain' }}
            />
            <Text style={{fontFamily: FONT.regular2, fontSize: SIZES.small+2, color: COLORS.gray3, textAlign: 'center'}}>
              Roll it
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GamePage;
