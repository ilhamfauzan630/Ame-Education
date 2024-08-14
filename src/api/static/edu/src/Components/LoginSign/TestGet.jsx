import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

class TestGet extends Component{
    constructor(props){
        super(props);

        this.state = {
            posts: [],
            errorMsg: ''
        }
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            console.log(response)
            this.setState({ posts: response.data});
        })
        .catch(error => {
            console.log(error)
            this.setState({ errorMsg: 'Error Cikkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'});
        })
    }

    render() {
        const { posts, errorMsg} = this.state;
        return (
            <div>
                {
                    posts.length ?
                    posts.map(post => <div key={post.id}>{post.title}</div>) :
                    null
                }

            </div>
        )
    }
}

export default TestGet;