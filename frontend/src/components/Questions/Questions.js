import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
// import parse from 'html-react-parser';
import Sidebar from '../Sidebar/Sidebar';
import './questions.css';
import { FilterList } from '@mui/icons-material';
import '../Header/header.css';
import Posts from './Posts';
import Pagination from './Pagination';

export default function Questions() {

    // const navigate = useNavigate();
    const [questions, setQuestions] = useState([])


    // for pagination
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //for pop-up of filter...
    // const [showFilter, setShowFilter] = useState(false);

    // fetch all the questions
    const fetchAllQuestions = async () => {
        await fetch("http://localhost:5000/api/question/fetchquestions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    const checkLoginStatus = ()=>{
        if(localStorage.getItem("username")!==null) setIsLoggedIn(true);
    }



    // Function to sort questions by higher votes question displays first
    const sortByVotes = async () => {
        await fetch("http://localhost:5000/api/question/fetchQueByHigherVotes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    // Function to filter all the questions which are answered.

    const answeredQuestions = async()=>{
        await fetch("http://localhost:5000/api/question/answeredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    const unansweredQuestions = async() => {
        await fetch("http://localhost:5000/api/question/unansweredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    useEffect(() => {
        fetchAllQuestions();
        checkLoginStatus();
        // FindFrequencyOfAns();
        // fetchVotes();

    }, [])

    // logic to find index of posts to display questions
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <>
            <div Style="height:100%; margin-top:13vh; z-index:1; background-color:white">
                <div class="">
                    <div className="stack-index">
                        <div className="stack-index-content" >
                            <Sidebar />
                            <div className="main">
                                <div className="main-container">
                                    <div className="main-top">
                                        <h2><b>All Questions</b></h2>
                                        {isLoggedIn && <NavLink to="/editor"><button>Ask Question</button></NavLink>}
                                    </div>

                                    <div className='main-desc'>
                                        <p>{questions.length} Questions</p>
                                        <div className="main-filter">
                                            <div className="main-tabs">
                                                <div className="main-tab">
                                                    <NavLink className="tab" onClick={answeredQuestions}>Answered</NavLink>
                                                </div>
                                                <div className="main-tab">
                                                    <NavLink className="tab" onClick={sortByVotes}>Votes</NavLink>
                                                </div>
                                                <div className="main-tab">
                                                    <NavLink className="tab" onClick={unansweredQuestions}>Unanswered</NavLink>
                                                </div>
                                            </div>

                                            {/* filter functionality
                                            <div className="main-filter-item" onClick={(e) => {
                                                e.persist();
                                                setShowFilter(!showFilter);

                                            }
                                            }>
                                                <FilterList style={{ fontSize: '21px' }} />
                                                <p className="filter-text">Filter</p>
                                            </div>

                                            {
                                                showFilter && (
                                                    <div className="filter_main">
                                                        <div className="card3">
                                                            <p>tag</p>
                                                            <p>answered</p>
                                                            <p>unanswered</p>
                                                            <p>4</p>
                                                        </div>
                                                    </div>
                                                )
                                            } */}
                                        </div>
                                    </div>
                                    {/* This displays all questions */}
                                    <div className="questions">
                                        <div className="question">
                                            <Posts posts={currentPosts} />
                                        </div>
                                    </div>
                                    <div className="container" style={{marginLeft: "35%"}}>
                                        <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </>

    )
}
