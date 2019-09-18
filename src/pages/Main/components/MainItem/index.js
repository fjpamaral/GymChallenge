import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Creators as GymActions} from '~/store/ducks/gym';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {colors} from '~/styles';
import styles from './styles';

class MainItem extends Component {
  static propTypes = {
    item: PropTypes.shape().isRequired,
    gym: PropTypes.shape(),
    GymActions: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    item: {
      logo: '',
    },
    gym: {
      list: [],
      loading: false,
      error: null,
    },
  };

  state = {
    searchText: '',
    list: null,
    expanded: true,
    animation: new Animated.Value(1),
    minHeight: null,
    maxHeight: null,
    setup: false,
  };

  _setMaxHeight(event) {
    if (!this.state.setup) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height,
      });
    }
  }

  _setMinHeight(event) {
    if (!this.state.setup) {
      this.setState({
        minHeight: event.nativeEvent.layout.height,
      });
    }
  }

  toggle = () => {
    let initialValue = this.state.expanded ? 1 : 0.8,
      finalValue = this.state.expanded ? 0.8 : 1;

    this.setState({expanded: !this.state.expanded, setup: true});
    this.state.animation.setValue(initialValue);
    Animated.timing(this.state.animation, {
      toValue: finalValue,
      duration: 3000,
    }).start();
  };

  handleCheckIn = activity => {
    Alert.alert(
      'Check In',
      `Deseja Confirmar o Check In?\n\nAcademia: ${
        this.props.item.title
      }\nAtividade: ${activity.title}\n`,
      [
        {text: 'Não', onPress: () => {}},
        {
          text: 'Sim',
          onPress: () => {
            this.props.GymActions.postGymActivityRequest(
              this.props.item.id,
              activity.id,
            );
          },
        },
      ],
      {cancelable: false},
    );
  };

  handleSelectedGym = () => {
    this.setState({currentGym: item.id});
  };

  handleRating = rating => {
    const nFullStar = Math.floor(rating);
    const bHalfStar = Number.isInteger(rating);
    let nEmptyStar = 0;
    if (!bHalfStar) nEmptyStar = 4 - nFullStar;
    else nEmptyStar = 5 - nFullStar;
    const arrStar = [];

    if (nFullStar > 0) {
      for (let i = 0; i < nFullStar; i += 1) {
        arrStar.push('fullStar');
      }
    }
    if (!bHalfStar) arrStar.push('halfStar');
    if (nEmptyStar > 0) {
      for (let i = 0; i < nEmptyStar; i += 1) {
        arrStar.push('emptyStar');
      }
    }

    return arrStar.map(item =>
      item === 'fullStar' ? (
        <Icon
          key={String(Math.random())}
          name="star"
          size={18}
          color={colors.star}
        />
      ) : item === 'halfStar' ? (
        <Icon
          key={String(Math.random())}
          name="star-half"
          size={18}
          color={colors.star}
        />
      ) : (
        <Icon
          key={String(Math.random())}
          name="star-outline"
          size={18}
          color={colors.regular}
        />
      ),
    );
  };

  renderItem = ({item}) => (
    <View
      style={styles.containerActivity}
      onLayout={this._setMaxHeight.bind(this)}>
      <Text style={styles.textActivityInfo}>{item.title}</Text>
      <TouchableOpacity
        style={styles.buttonCheckIn}
        onPress={() => this.handleCheckIn(item)}>
        <Text style={styles.textCheckIn}>Check In</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <Animated.View
        style={[styles.container, {opacity: this.state.animation}]}>
        <TouchableOpacity
          style={styles.containerItem}
          onPress={() => this.toggle()}
          onLayout={this._setMinHeight.bind(this)}>
          <Image
            style={styles.thumbnail}
            source={{uri: this.props.item.logo}}
          />
          <View style={styles.containerItemInfo}>
            <Text style={styles.textTitle} numberOfLines={2}>
              {this.props.item.title}
            </Text>
            <Text style={styles.textInfo} numberOfLines={2}>
              {this.props.item.address}
            </Text>
            <View style={styles.rating}>
              {this.handleRating(this.props.item.rating)}
            </View>
          </View>
        </TouchableOpacity>
        {this.state.expanded ? (
          <View style={styles.containerAction}>
            <Text style={styles.textActivity}>Atividades disponíveis</Text>
            <FlatList
              data={this.props.item.activities}
              keyExtractor={item => String(item.id)}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={
                <Text style={styles.textEmpty}>Nenhuma atividade</Text>
              }
            />
          </View>
        ) : (
          <View />
        )}
      </Animated.View>
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
)(MainItem);
