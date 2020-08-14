import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity , Alert} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';
export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Loading...",
      lexicalCategory :'',
      definition : ""
    };
  }

  getWord=(text)=>{
    var text1 = text.toLowerCase()
    try{
      var word = dictionary[text1]["word"]
      var lexicalCategory = dictionary[text1]["lexicalCategory"]
      var definition = dictionary[text1]["definition"]
      this.setState({
        "word" : word,
        "lexicalCategory" : lexicalCategory,
        "definition" : definition
      })
    }
    catch(err){
      alert("Sorry,but unfortunately this word doesnot exist in our db")
      this.setState({
        'text':'',
        'isSearchPressed':false
      })
    }
  }

  render(){
    return(
      <View style={{flex:1, backgroundColor:"black" }}>
        <Header
          backgroundColor={'purple'}
          centerComponent={{
            text: 'Offline Dictionary',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.ip}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                defination : ""
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.to}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.wld}>
                      Word :{" "}
                    </Text>
                    <Text style={styles.eld}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.wld}>
                      Type :{" "}
                    </Text>
                    <Text style={styles.eld}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                    <Text style={styles.wld}>
                      Definition :{" "}
                    </Text>
                    <Text style={styles.eld}>
                      {this.state.definition}
                    </Text>
                </View>
              )
              :undefined
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"ffffff"
  },
  ip: {
    backgroundColor:"#28334AFF",
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height:40,
    marginLeft:65,
    marginTop:20,
    textAlign:"center",
    color:"#FBDE44FF"
  },
  to: {
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"purple",
    borderRadius:6,
    marginLeft:120,
    marginTop:20,
    marginBottom: 33,
  },
  searchText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  outputContainer:{
    flex:0.7,
    alignItems:'center'
  },
  eld:{
    color:"#39FF14",
    textAlign:"center",
    alignContent:"center",
    justifyContent:"center"
  },
  wld:{
    color:"#ffffff",
    textAlign:"center",
    alignContent:"center",
    justifyContent:"center"
  }
});