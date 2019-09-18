import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '~/styles';
import {Creators as GymActions} from '~/store/ducks/gym';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {store} from '~/store';
import MainItem from './components/MainItem';
import styles from './styles';

class Main extends Component {
  static propTypes = {
    gym: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape()),
      loading: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
    GymActions: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    gym: {
      list: [],
      loading: false,
      error: null,
    },
  };

  state = {
    searchText: '',
    list: null,
  };

  componentDidMount() {
    this.props.GymActions.getGymsRequest();
  }

  filterList = listItem => {
    if (
      listItem.title
        .toString()
        .toUpperCase()
        .indexOf(this.state.searchText.toUpperCase()) !== -1
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <LinearGradient
        colors={[colors.secundary3, colors.secundary2]}
        style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.secundary3}
        />
        <View style={styles.containerTitle}>
          <Text style={styles.welcome}>GymPass Challenge</Text>
        </View>
        <View style={styles.containerSearch}>
          <TextInput
            testID="test-SearchInput"
            style={styles.inputSearch}
            value={this.state.searchText}
            onChangeText={searchText => this.setState({searchText})}
            placeholder="Pesquisar academias..."
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.setState({searchText: ''})}>
            {this.state.searchText ? (
              <Icon size={24} name="close" color={colors.regular} />
            ) : (
              <Icon size={24} name="magnify" color={colors.regular} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.containerList}>
          {this.props.gym.loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <FlatList
              testID="test-GymItem"
              data={
                this.state.searchText
                  ? this.props.gym.list.filter(this.filterList)
                  : this.props.gym.list
              }
              keyExtractor={item => String(item.id)}
              renderItem={({item}) => <MainItem item={item} />}
              refreshing={this.props.gym.loading}
              onRefresh={this.props.GymActions.getGymsRequest}
              ListEmptyComponent={
                <Text style={styles.textEmpty}>Nenhum item encontrado</Text>
              }
            />
          )}
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  gym: state.gym,
});

const mapDispatchToProps = dispatch => ({
  GymActions: bindActionCreators(GymActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
