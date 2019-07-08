import React, { Component } from 'react';
import {Text, View, ScrollView, StyleSheet } from 'react-native';

import {itemsFetchData} from './services'

import { connect } from 'react-redux';

import {H} from '../../constants'


const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};


class ItemList extends Component {
    constructor() {
        super();

      /*  this.state = {
            items: [],
            hasErrored: false,
            isLoading: false
        };
        */
    }


    componentDidMount() {
        //this.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');

        this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
    }

    fetchData(url) {
        this.setState({ isLoading: true });
    
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
    
                this.setState({ isLoading: false });
    
                return response;
            })
            .then((response) => response.json())
            .then((items) => this.setState({ items })) // ES6 property value shorthand for { items: items }
            .catch(() => this.setState({ hasErrored: true }));
    }

    render() {
        if (this.props.hasErrored) {
            return <View style={styles.container}><Text>Sorry! There was an error loading the items</Text></View>;
        }

        if (this.props.isLoading) {
            return <View style={styles.container}><Text>Loading…</Text></View>;
        }

        console.log(H)

        return (
            <ScrollView>
                <View style={styles.container}>
                    {this.props.items.map((item) => (
                        <Text key={item.id}>
                            {item.label}
                        </Text>
                    ))}
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      marginTop: H * 0.13,
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexShrink: 2,
      justifyContent: 'space-around',
      padding: 10,
      marginBottom: 150
    }
  })

  export default connect(mapStateToProps, mapDispatchToProps)(ItemList);