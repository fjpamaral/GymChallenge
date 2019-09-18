import {StyleSheet} from 'react-native';
import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    color: colors.secundary4,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: metrics.basePadding / 2,
    margin: metrics.baseMargin,
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.secundary4,
    elevation: 2,
    shadowOpacity: 1,
    shadowColor: colors.light,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: metrics.baseRadius,
  },
  inputSearch: {
    flex: 1,
  },
  searchButton: {
    paddingHorizontal: metrics.basePadding / 4,
  },
  containerList: {
    flex: 1,
    marginHorizontal: metrics.baseMargin,
    marginBottom: metrics.baseMargin,
  },
  textEmpty: {
    color: colors.secundary4,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
