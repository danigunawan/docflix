import * as APIUtil from '../util/serie_api_util';

export const RECEIVE_SERIES = 'RECEIVE_SERIES';
export const RECEIVE_SERIE = 'RECEIVE_SERIE';

export const fetchSeries = () => dispatch => {
  return APIUtil.fetchSeries().then(series => {
    dispatch(receiveSeries(series));
  });
};


export const fetchSerie = id => dispatch => {
  return APIUtil.fetchSerie(id).then(serie => dispatch(receiveSerie(serie)));
};

const receiveSeries = series => ({
  type: RECEIVE_SERIES,
  series
});

const receiveSerie = serie => ({
  type: RECEIVE_SERIE,
  serie
});
