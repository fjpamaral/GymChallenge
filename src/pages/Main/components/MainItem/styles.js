import {StyleSheet} from 'react-native';
import {colors, metrics} from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secundary4,
    marginVertical: metrics.baseMargin,
    padding: metrics.basePadding / 2,
    borderRadius: metrics.baseRadius,
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    padding: metrics.basePadding / 2,
  },
  containerItemInfo: {
    flex: 1,
    paddingHorizontal: metrics.basePadding / 2,
  },
  textTitle: {
    color: colors.secundary3,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInfo: {
    color: colors.secundary2,
    fontSize: 12,
    fontStyle: 'italic',
  },
  thumbnail: {
    width: 75,
    height: 75,
    borderRadius: metrics.baseRadius,
  },
  textEmpty: {
    color: colors.secundary4,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  containerAction: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: metrics.baseMargin,
  },
  containerActivity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: metrics.baseMargin / 2,
  },
  textActivity: {
    color: colors.dark,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textActivityInfo: {
    color: colors.dark,
    fontSize: 12,
  },
  buttonCheckIn: {
    padding: metrics.basePadding / 4,
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.primary,
  },
  textCheckIn: {
    color: colors.secundary4,
    fontSize: 12,
  },
  separator: {
    width: '100%',
    height: 1,
    marginTop: metrics.baseMargin / 2,
    backgroundColor: colors.lighter,
  },
});

export default styles;
