import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Achievement = () => {
  const [activeTab, setActiveTab] = useState('Number of Orders');
  const [achievements, setAchievements] = useState([
    { title: 'Completing 5 Orders', description: "Congratulations! You've completed 5 orders.", image: 'https://img.freepik.com/premium-vector/steak-food-plate-with-knife-fork-cartoon-illustration_138676-1505.jpg', clicked: false },
    { title: 'Completing 10 Orders', description: "Congratulations! You've completed 10 orders.", image: 'https://as1.ftcdn.net/v2/jpg/03/75/20/92/1000_F_375209262_we2jISLb69hYesNU1hylpdXKvZXOEbM1.jpg', clicked: false },
    { title: 'Completing 25 Orders', description: "Congratulations! You've completed 25 orders.", image: 'https://www.deliciousmagazine.co.uk/wp-content/uploads/2017/11/du-768x960.jpg', clicked: false },
    { title: 'Completing 50 Orders', description: "Congratulations! You've completed 50 orders.", image: 'https://clipart-library.com/images/pc7KKAXKi.jpg', clicked: false },
    { title: 'Completing 100 Orders', description: "Congratulations! You've completed 100 orders.", image: 'https://m.media-amazon.com/images/I/41mUvRO4kXL.jpg', clicked: false },
    { title: 'Completing 250 Orders', description: "Congratulations! You've completed 250 orders.", image: 'https://st3.depositphotos.com/1077687/13012/v/950/depositphotos_130120348-stock-illustration-fast-food-cart-icon.jpg', clicked: false },
    { title: 'Completing 500 Orders', description: "Congratulations! You've completed 500 orders.", image: 'https://i.gifer.com/57Q6.gif', clicked: false },
    { title: 'Completing 750 Orders', description: "Congratulations! You've completed 750 orders.", image: 'https://as2.ftcdn.net/v2/jpg/01/84/18/75/1000_F_184187507_KHfFSAhgao4YH8opYHfTeW7cgPvn4qeE.jpg', clicked: false },
    { title: 'Completing 1000 Orders', description: "Congratulations! You've completed 1000 orders.", image: 'https://media.tenor.com/Lef6Xa4oKv8AAAAC/hungry-cat.gif', clicked: false },
  ]);

  const [savingsAchievements, setSavingsAchievements] = useState([
    { title: 'Saving $20', description: "Congratulations! You've saved $20.", image: 'https://cdn.pixabay.com/photo/2020/06/08/06/51/money-5273328_1280.png', clicked: false },
    { title: 'Saving $50', description: "Congratulations! You've saved $50.", image: 'https://friendlystock.com/wp-content/uploads/2020/06/4-money-character-holding-cash-cartoon-clipart-600x551.jpg', clicked: false },
    { title: 'Saving $100', description: "Congratulations! You've saved $100.", image: 'https://i.pinimg.com/originals/7b/5b/12/7b5b1242dadb167e2c8962b22c271974.gif', clicked: false },
    { title: 'Saving $250', description: "Congratulations! You've saved $250.", image: 'https://media0.giphy.com/media/5fBH6zoAQg9dHK2ttsc/200w.gif?cid=6c09b952wn7pxybuefq545i5kiovss1z6fqxu4mdan20t3tn&ep=v1_gifs_search&rid=200w.gif&ct=g', clicked: false },
    { title: 'Saving $500', description: "Congratulations! You've saved $500.", image: 'https://i.pinimg.com/originals/bc/41/69/bc41691855059f6d6a2082edfe8460a7.gif', clicked: false },
    { title: 'Saving $750', description: "Congratulations! You've saved $750.", image: 'https://64.media.tumblr.com/4ab18a7b06573532b123aa177c4abe5b/tumblr_pz6xyulzBl1tzqospo1_540.gif', clicked: false },
    { title: 'Saving $1000', description: "Congratulations! You've saved $1000.", image: 'https://media.tenor.com/KgIC_rUjd08AAAAC/scrooge-donald-duck.gif', clicked: false },
  ]);

  const [ratingsAchievements, setRatingsAchievements] = useState([
    { title: '1st 5-Star Rating', description: "Congratulations! You've received your first 5-star rating.", image: 'https://cdn2.vectorstock.com/i/1000x1000/56/76/cartoon-star-vector-20475676.jpg', clicked: false },
    { title: '20th 5-Star Rating', description: "Congratulations! You've received 20th 5-star ratings.", image: 'https://i.pinimg.com/originals/b6/31/0e/b6310e974d150f85ddcdf3dea1960224.gif', clicked: false },
    { title: '50th 5-Star Rating', description: "Congratulations! You've received 50th 5-star ratings..", image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjE4MDkwZTc4YzhmNDU0ZGIzZTQ3YTQwYjVkN2Y2NmI3NTNjNWEzMyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/9G5bX9nXYfmmatgn0B/giphy.gif', clicked: false },
    { title: '100th 5-Star Rating', description: "Congratulations! You've received 100th 5-star ratings.", image: 'https://gifdb.com/images/high/animated-celebration-dance-party-cartoon-characters-ajstdmwplsghhz24.gif', clicked: false },
    { title: '250th 5-Star Rating', description: "Congratulations! You've received 250th 5-star ratings.", image: 'https://media1.giphy.com/media/wjIDrGKbvuGxW/200w.gif?cid=6c09b952zefaca5fv4z5p53uisk1j4eu457gaqxvqr3744f8&ep=v1_gifs_search&rid=200w.gif&ct=s', clicked: false },
    { title: '500th 5-Star Rating', description: "Congratulations! You've received 500th 5-star ratings.", image: 'https://media4.giphy.com/media/3o6ZsVppywJmE4EDCM/giphy.gif', clicked: false },
    { title: '750th 5-Star Rating', description: "Congratulations! You've received 750th 5-star ratings.", image: 'https://gifdb.com/images/high/animated-celebration-super-mario-winner-g1zft7ujxhm3labb.gif', clicked: false },
    { title: '1000th 5-Star Rating', description: "Congratulations! You've received 1000th 5-star ratings.", image: 'https://media1.giphy.com/media/VR8Sgeow2n0Q0/giphy.gif', clicked: false },
  ]);

  const [mysteryAchievements, setMysteryAchievements] = useState([
    { originalTitle: 'Chatty Cathy!', title: 'Secret Achievement 1', description: "Congratulations on sending 42 messages in group order messaging chats!", image: 'https://media2.giphy.com/media/l46ClaXHno7jQQ8EM/200w.gif?cid=82a1493b2iv659gm2ghh5fhccw7m34w2a754k7s4f996u46q&ep=v1_gifs_related&rid=200w.gif&ct=g', clicked: false },
    { originalTitle: 'Scooby Snacks', title: 'Secret Achievement 2', description: "Congratulations on placing an order past 12:00 AM!", image: 'https://media.tenor.com/4CtMO568jOQAAAAC/scooby-doo-shaggy.gif', clicked: false },
    { originalTitle: 'Thanksgiving Feast!', title: 'Secret Achievement 3', description: "Congratulations on placing an order in a group of 7 or larger!", image: 'https://media3.giphy.com/media/Lkr1ybJeUFmP8Ws25a/giphy.gif', clicked: false },
    { originalTitle: 'The Smaller the Better!', title: 'Secret Achievement 4', description: "Congratulations on spending $1.00 or less on delivery fees plus service fees!", image: 'https://www.icegif.com/wp-content/uploads/2022/02/icegif-911.gif', clicked: false },
    { originalTitle: "Snitches DON'T get stitches", title: 'Secret Achievement 5', description: "Congratulations on rightfully reporting someone for group order misconduct!", image: 'https://i.gifer.com/Qpz.gif', clicked: false },
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAchievementClick = (index, tab) => {
    if (tab === 'Number of Orders') {
      setAchievements((prevAchievements) => {
        const updatedAchievements = [...prevAchievements];
        updatedAchievements[index].clicked = true;
        return updatedAchievements;
      });
    } else if (tab === 'Savings') {
      setSavingsAchievements((prevSavingsAchievements) => {
        const updatedSavingsAchievements = [...prevSavingsAchievements];
        updatedSavingsAchievements[index].clicked = true;
        return updatedSavingsAchievements;
      });
    } else if (tab === 'Ratings') {
      setRatingsAchievements((prevRatingsAchievements) => {
        const updatedRatingsAchievements = [...prevRatingsAchievements];
        updatedRatingsAchievements[index].clicked = true;
        return updatedRatingsAchievements;
      });
    } else if (tab === 'Mystery') {
      setMysteryAchievements((prevMysteryAchievements) => {
        const updatedMysteryAchievements = [...prevMysteryAchievements];
        const clicked = updatedMysteryAchievements[index].clicked;
        updatedMysteryAchievements[index].clicked = !clicked;
        return updatedMysteryAchievements;
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabs}>
      <TouchableOpacity
          style={[styles.tab, activeTab === 'Number of Orders' && styles.activeTab]}
          onPress={() => handleTabChange('Number of Orders')}
        >
          <Text style={[styles.tabText, activeTab === 'Number of Orders' && styles.activeTabText]}>
            Number of Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Savings' && styles.activeTab]}
          onPress={() => handleTabChange('Savings')}
        >
          <Text style={[styles.tabText, activeTab === 'Savings' && styles.activeTabText]}>Savings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Ratings' && styles.activeTab]}
          onPress={() => handleTabChange('Ratings')}
        >
          <Text style={[styles.tabText, activeTab === 'Ratings' && styles.activeTabText]}>Ratings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Mystery' && styles.activeTab]}
          onPress={() => handleTabChange('Mystery')}
        >
          <Text style={[styles.tabText, activeTab === 'Mystery' && styles.activeTabText]}>Mystery</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'Number of Orders' && (
        <>
          {achievements.map((achievement, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.achievement, !achievement.clicked && styles.grayedOutAchievement]}
              onPress={() => handleAchievementClick(index, activeTab)}
              activeOpacity={0.8}
              disabled={achievement.clicked}
            >
              <View style={styles.contentContainer}>
                <Text
                  style={[styles.achievementTitle, !achievement.clicked && styles.grayedOutAchievementText]}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={[styles.achievementDescription, !achievement.clicked && styles.grayedOutAchievementText]}
                >
                  {achievement.description}
                </Text>
              </View>
              <Image
                source={{ uri: achievement.image }}
                style={[styles.image, !achievement.clicked && styles.grayedOutAchievementImage]}
              />
            </TouchableOpacity>
          ))}
        </>
      )}
      {activeTab === 'Savings' && (
        <>
          {savingsAchievements.map((achievement, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.achievement, !achievement.clicked && styles.grayedOutAchievement]}
              onPress={() => handleAchievementClick(index, activeTab)}
              activeOpacity={0.8}
              disabled={achievement.clicked}
            >
              <View style={styles.contentContainer}>
                <Text
                  style={[styles.achievementTitle, !achievement.clicked && styles.grayedOutAchievementText]}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={[styles.achievementDescription, !achievement.clicked && styles.grayedOutAchievementText]}
                >
                  {achievement.description}
                </Text>
              </View>
              <Image
                source={{ uri: achievement.image }}
                style={[styles.image, !achievement.clicked && styles.grayedOutAchievementImage]}
              />
            </TouchableOpacity>
          ))}
        </>
      )}
      {activeTab === 'Ratings' && (
        <>
          {ratingsAchievements.map((achievement, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.achievement, !achievement.clicked && styles.grayedOutAchievement]}
              onPress={() => handleAchievementClick(index, activeTab)}
              activeOpacity={0.8}
              disabled={achievement.clicked}
            >
              <View style={styles.contentContainer}>
                <Text
                  style={[styles.achievementTitle, !achievement.clicked && styles.grayedOutAchievementText]}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={[styles.achievementDescription, !achievement.clicked && styles.grayedOutAchievementText]}
                >
                  {achievement.description}
                </Text>
              </View>
              <Image
                source={{ uri: achievement.image }}
                style={[styles.image, !achievement.clicked && styles.grayedOutAchievementImage]}
              />
            </TouchableOpacity>
          ))}
        </>
      )}
      {activeTab === 'Mystery' && (
        <>
          {mysteryAchievements.map((achievement, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.achievement, !achievement.clicked && styles.grayedOutAchievement]}
              onPress={() => handleAchievementClick(index, activeTab)}
              activeOpacity={0.8}
              disabled={achievement.clicked}
            >
              <View style={styles.contentContainer}>
                <Text
                  style={[
                    styles.achievementTitle,
                    !achievement.clicked && styles.grayedOutAchievementText,
                  ]}
                >
                  {achievement.clicked ? achievement.originalTitle : achievement.title}
                </Text>
                {achievement.clicked && (
                  <>
                    <Text
                      style={[
                        styles.achievementDescription,
                        !achievement.clicked && styles.grayedOutAchievementText,
                      ]}
                    >
                      {achievement.description}
                    </Text>
                  </>
                )}
              </View>
              {achievement.clicked && (
                <Image style={styles.achievementImage} source={{ uri: achievement.image }} />
              )}
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    marginTop: -10,
    backgroundColor: '#F4EEE0'
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16, 
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  activeTabText: {
    color: 'black',
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  grayedOutAchievement: {
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  achievementDescription: {
    marginTop: 4,
    fontSize: 14,
    color: 'black',
  },
  grayedOutAchievementText: {
    color: 'gray',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  grayedOutAchievementImage: {
    opacity: 0.5,
  },
  achievementImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});



export default Achievement;