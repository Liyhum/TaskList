import React from 'react';
import { View,Text,StyleSheet ,SafeAreaView,TouchableOpacity,FlatList,Keyboard,TextInput,Animated} from "react-native";
import {AntDesign,Ionicons,EvilIcons} from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';//this one 
import {GestureHandlerRootView, gestureHandlerRootHOC } from 'react-native-gesture-handler'

import colors from '../assets/color';

export default class TodoModal extends React.Component{
    state ={
        newTodo:""
    }
    toggleTodoCompleted = index =>{
        let list = this.props.list
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list)
    }
    addTodo=()=>{
        let list =this.props.list
        list.todos.push({title:this.state.newTodo,completed:false})
        
        this.props.updateList(list)
        this.setState({newTodo:""})
        Keyboard.dismiss();
    }
    delete(index){
        let list = this.props.list
        list.todos.splice(index,1)
        console.log(list," _+_+_+_+_+_+_ ",index)
        this.props.updateList(list)
    }
    renderTodo=(todo,index)=>{
        return(
                <View style={Styles.todoContainer}>
                    <TouchableOpacity onPress={()=>this.toggleTodoCompleted(index)}>
                        <Ionicons 
                        name ={todo.completed? "ios-square" :"ios-square-outline"}
                        size={24} 
                        colors ={colors.black} 
                        style={{width:32}}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%'}}>
                    <Text style={[Styles.todo,{
                        textDecorationLine:todo.completed?"line-through":"none",
                        color:todo.completed? colors.gray: colors.black}]}>
                        {todo.title}
                    </Text>
                    <TouchableOpacity onPress={()=>this.delete(index)}>
                        <EvilIcons name="trash" size={30}/>
                    </TouchableOpacity>
                    </View>
                </View>
        )
    }
    
    render(){
        const list = this.props.list
        const taskCount = list.todos.length
        const completedCount = list.todos.filter(todo=> todo.completed).length
        return(
           <View style={Styles.container}>
               <TouchableOpacity style={Styles.button} onPress={this.props.closeModal}>
                <AntDesign name="close" size = {24} color={colors.black}/>
               </TouchableOpacity>
               <View style={[Styles.section,Styles.header,{borderBottomColor:list.color}]}>
                   <Text style={Styles.title}>{list.name}</Text>
                   <Text style={Styles.taskCount}>
                        {completedCount} of {taskCount} tasks
                   </Text>
               </View>
                <View style={[Styles.section,{flex:3}]}>
                    <FlatList 
                    data={list.todos}
                    renderItem={({item,index})=>this.renderTodo(item,index)}
                    keyExtractor={item=>item.title}
                    contentContainerStyle={{paddingHorizontal:32,paddingVertical:64,}}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
             
                <View style={[Styles.section,Styles.footer]} >
                    <TextInput 
                    style={[Styles.input,{borderColor:list.color}]}
                    onChangeText ={text=> this.setState({newTodo:text})}
                    value={this.state.newTodo}
                    />
                    <TouchableOpacity 
                    style={[Styles.addTodo,{backgroundColor: list.color}]}
                    onPress={()=>this.addTodo()}
                    >
                        <AntDesign name="plus" size={16} color={colors.white}/>
                    </TouchableOpacity>
                </View>
           </View>
        )
    }
}
const Styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    button:{
        position:'absolute',
        top:38,
        right:32,
        zIndex:10
    },
    section :{
        flex:1,
        alignSelf:'stretch',
    },
    header:{
        justifyContent: 'flex-end',
        marginLeft:64,
        borderBottomWidth:3,
        marginTop:45
    },
    title:{
        fontSize:30,
        fontWeight:"bold",
        color:colors.black
    },
    taskCount:{
        marginTop:4,
        marginBottom:16,
        color:colors.grey,
        fontWeight:'600'
    },
    footer:{
        paddingHorizontal:30,
        flexDirection:'row',
        alignItems:'center',
        
    },
    input:{
        flex:1,
        height:50,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius:6,
        marginRight:8,
        paddingHorizontal:8,
    },
    addTodo:{
        borderRadius:4,
        padding:16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer:{
        paddingVertical:16,
        flexDirection:'row',
        alignItems:'center',
    },
    todo:{
        color:colors.black,
        fontWeight:'700',
        fontSize:16
    }
})
