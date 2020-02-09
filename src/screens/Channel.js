import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';
// TODO: import PostImageWrapper after create-post-images is merged
import Post from '../components/Post';
import NavigationOptions from '../config/NavigationOptions';
import { HeaderBackButton } from 'react-navigation';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { DefaultColors, Palette, Skin, Settings } from '../config/Settings';
import { getFeedForChannel, getMoreFeedForChannel } from '../services/feedService';

class Channel extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "View Post: " + this.state.channelData.name,
        ...NavigationOptions,
        headerLeft: (
            <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
        )
    });

    state = {
        channelData: { name: "", description: "", avatarUrl: "", headerUrl: "" },
        feed: [],
        loadDataComplete: false,
        refreshing: false,
        feedAtEnd: false,
        loadingMore: false
    }

    componentDidMount = async () => {
        if (!this.state.loadDataComplete) {
            await this.onRefresh()

            this.setState({ loadDataComplete: true })
        }
    }

    onRefresh = async () => {
        this.setState({ refreshing: true })

        let feed = await getFeedForChannel(this.props.channelId)
        const feedAtEnd = feed.length < Settings.Home_PostsPerPage

        this.setState({ feed, refreshing: false, feedAtEnd })
    }

    onLoadMore = async () => {
        // don't load more if we're already loading
        if (this.state.loadingMore === false) {
            this.setState({ loadingMore: true })

            let moreFeed = await getMoreFeedForChannel(this.props.channelId, this.state.feed[this.state.feed.length - 1].publishedAt)
            const feedAtEnd = moreFeed.length < Settings.Home_PostsPerPage
            const prevFeed = this.state.feed
            const feed = prevFeed.concat(moreFeed)

            this.setState({ feed, loadingMore: false, feedAtEnd })
        }
    }

    render() {
        let channelData = this.props.globalData.getChannelBasicInfo(this.props.channelId)
        let channelPostsDisplay = []
        this.state.feed.forEach((post) => {
            channelPostsDisplay.push(
                <Post key={post._id} post={post} navigation={this.props.navigation} />
            )
        })

        return (
            <ScrollView
                refreshControl={
                    Platform.OS === "ios" ?
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this.onRefresh} />
                        :
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            progressBackgroundColor={Skin.Home_RefreshBackground_Android}
                            colors={[Skin.Home_Refresh_Android]} />
                }
            >
                {(this.state.refreshing && Platform.OS == "ios") &&
                    <View style={{ paddingTop: Constants.statusBarHeight }}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color={Skin.Home_LoadMoreActivityIndicator_iOS} />
                    </View>
                }
                <Image
                    style={styles.header}
                    source={{ uri: channelData.headerUrl }} />
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: channelData.avatarUrl }} />
                    <View style={{ flex: 1 }}>
                        <BoldText style={styles.channelName}>{channelData.name}</BoldText>
                        <RegularText style={styles.description}>{channelData.description}</RegularText>
                    </View>
                </View>
                {channelPostsDisplay}
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {

    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 8
    },
    channelName: {

    },
    channelDescription: {

    }
});

export default withUnstated(Channel, { globalData: GlobalDataContainer });