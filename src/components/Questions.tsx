import '../App.css'
import React, { useState } from 'react'
import axios from 'axios'
const Questions: React.FC = () => {
  const generes = {
    Romance: "M-1",
    Action: "M-2",
    Fear: "M-3",
    Thriller: "M-4",
    Drama: "M-5",
  }
  const nature = {
    Extrovert: "1",
    Introvert: "2"
  }
  const [clss, setClss] = useState<string>("ques-op");
  const [opt, setOpt] = useState<string>("ques-op");
  const [selected, setSelected] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [book1, setBook1] = useState<string>("");
  const [book2, setBook2] = useState<string>("");
  const [toggler, setToggler] = useState<boolean>(false);
  const handleClick = () => {
    setClss("ques-op active");
  }
  const handleoptClick = () => {
    setOpt("ques-op active");
  }

  const handleSubmit = () => {
    let params1;
    let params2;
    for (let key in generes) {
      if (generes[key] === selected) {
        params1 = key;
      }
    }
    for (let key in nature) {
      if (nature[key] === option) {
        params2 = key;
      }
    }
    const obj = {
      params1,
      params2
    }
    console.log(obj);


    axios.post('https://yryf9jc7i8.execute-api.ap-south-1.amazonaws.com/', obj).then(resp => {
      console.log(resp.data)
      setBook1(resp.data[0].key);
      setBook2(resp.data[1].key);
      setToggler(true);
    })
  }









  return (
    <div className='main-ques'>
      <h3>Question - 1</h3>
      <p>Which Movie Do You Like From Following</p>
      <div className="options">
        <div className={selected === "M-1" ? clss : "ques-op"} onClick={() => {
          setSelected("M-1")
          handleClick()
        }}>M-1</div>
        <div className={selected === "M-2" ? clss : "ques-op"} onClick={() => {
          setSelected("M-2")
          handleClick()
        }}>M-2</div>
        <div className={selected === "M-3" ? clss : "ques-op"} onClick={() => {
          setSelected("M-3")
          handleClick()
        }}>M-3</div>
        <div className={selected === "M-4" ? clss : "ques-op"} onClick={() => {
          setSelected("M-4")
          handleClick()
        }}>M-4</div>
        <div className={selected === "M-5" ? clss : "ques-op"} onClick={() => {
          setSelected("M-5")
          handleClick()
        }}>M-5</div>
      </div>
      <h3>Question - 2</h3>
      <p>it's Raining Slowly What You Will Do</p>
      <div className="options">
        <div className={option === "1" ? opt : "ques-op"}
          onClick={() => {
            setOption("1")
            handleoptClick()
          }}
        >Let's Go Out And Ask To Friends For Coffe or Tea</div>
        <div className={option === "2" ? opt : "ques-op"}
          onClick={() => {
            setOption("2")
            handleoptClick()
          }}
        >I Will Choose Cook Maggie At Home Andc Let's Sleep </div>
      </div>
      <div className="button"
        onClick={handleSubmit}
      >Submit</div>
      {
        toggler === true ?
          <div className='result-area'>
            <p>The Two Most Matching Books with your personality are :</p>
            <h4>{book1}</h4>
            <h4>{book2}</h4></div>
          : <p>Answers Will Appear Here Shortly!</p>
      }
    </div>
  )
}

export default Questions
