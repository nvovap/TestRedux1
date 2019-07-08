
//https://tuhub.ru/posts/redux-i-thunk-vmeste-react-rukovodstvo-dlya-chajnikov

import React from 'react';
import { Provider } from 'react-redux';

import ItemList from './src/components/ItemList'


import configureStore from './src/store/configureStore';

export default function App() {

  const store = configureStore();


  return (
    <Provider store={store}>
      <ItemList></ItemList>
    </Provider>
  );
}

