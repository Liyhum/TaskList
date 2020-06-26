import React,{Component} from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View,FlatList,TextInput } from 'react-native';
import colors from '../assets/color';
import {AntDesign} from '@expo/vector-icons';
import Data from '../assets/tempData'
import Todo from '../components/Todo'
import AddListModal from '../components/AddListModal'
// import {decode, encode} from 'react-native-base-64'
import Swipeable from 'react-native-gesture-handler/Swipeable'
 

class HomeScreen extends Component  {
  state={
    addTodoVisible :false,
    lists:Data,
    user:{},
    loading : true
  }
  toggleAddTodo (){
    this.setState({addTodoVisible: !this.state.addTodoVisible})
  }
  renderList = (list) =>{
    return <Todo list={list} updateList={this.updateList}/>
  }
  addList = list=>{
    this.setState({
      lists:[
        ...this.state.lists,
        {...list,id:this.state.lists.length + 1,todos:[]}
        
      ]});
  };
  updateList = list =>{
    this.setState({
      lists:this.state.lists.map(item =>{
        return item.id === list.id ?list : item
      })
    })
  }
  rightAction(){
    return(
      <View>
        <Text>safsa</Text>
      </View>

    )
  }
  render(){
    return(
      <View style={Styles.container}>
        <Modal animationType ="slide" 
        visible ={this.state.addTodoVisible}
        onRequestClose ={()=>this.toggleAddTodo()}
        >
          <AddListModal closeModal = {()=> this.toggleAddTodo()} addList={this.addList}/>
        </Modal>
        
        <View style={Styles.flex}> 
            <View style={Styles.divider}/>
            <Text style={Styles.title}>
              Todo <Text style={Styles.title2}> List</Text>
            </Text>
            <View style={Styles.divider}/>
        </View>
            <View style={Styles.plus}>
              <TouchableOpacity style={Styles.addList} onPress ={()=> this.toggleAddTodo()}>
                <AntDesign name="plus" size={16} color={colors.blue}/>
              </TouchableOpacity>
              <Text style={Styles.add}>Add list</Text>
            </View>
            <View style={Styles.dataList}>
              <FlatList
              data ={this.state.lists}
              keyExtractor={item=> item.name}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item})=>
                this.renderList(item)
              }
              keyboardShouldPersistTaps='always'
              />
            </View>
      </View>
    )
  }
}
export default HomeScreen

const Styles = StyleSheet.create({
  container :{
    flex:1,
    backgroundColor: "#fff",
    alignItems:"center",
    justifyContent: 'center',
  },
  divider :{
    backgroundColor: colors.lightblue,
    height:1,
    flex:1,
    alignSelf:'center'
  },
  flex:{
    flexDirection:'row',
    marginTop:100
  },
  title:{
    fontSize:38,
    color : colors.black,
    paddingHorizontal:64,
    fontWeight:'bold'
  },
  title2:{
    fontWeight:"300",
    color:colors.blue
  },
  plus:{
    marginVertical:48
  },
  addList:{
    borderWidth:2,
    borderColor:colors.lightblue,
    borderRadius:4,
    padding:16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add:{
    color:colors.blue,
    fontWeight:'bold',
    fontSize:14,
    marginTop:8
  },
  dataList:{
    flex:1,
    paddingLeft:32
  }
})
