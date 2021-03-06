import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
class Search extends React.Component {
  constructor() {
    super();
    this.state = {wd: '', words: [],index:-1};
  }

  handleChange = (event) => {//解决中文不能输入问题
    let wd = event.target.value;
    this.setState({wd},()=>{
      $.ajax({
        type:'GET',
        url:`http://www.baidu.com/su`,
        dataType:'jsonp',//指定响应体的内容类型
        jsonp:'cb',//指定在后台接收回调方法名的参数名
        data:{wd},//传递数据
        success:(result)=>{
          this.setState({words:result.s});
        }
      })
    });
  }
  handleKeyDown = (event)=>{
     let keyCode = event.keyCode;
     if(keyCode == 40 || keyCode == 38){
       let index = this.state.index;
       if(keyCode == 40){//向下
          if(++index>=this.state.words.length){
            index = -1;
          }
       }else if(keyCode = 38){//向上
          if(--index==-2){
            index=this.state.words.length-1;
          }
       }
       this.setState({index});
     }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                <input
                  onKeyDown={this.handleKeyDown}
                  onChange={this.handleChange}
                  value={this.state.index == -1?this.state.wd:this.state.words[this.state.index]}
                  type="text" className="form-control"/>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {
                    this.state.words.map((item, index) => (
                      <li key={index} className={"list-group-item "+(index==this.state.index?"active":"")}>{item}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
