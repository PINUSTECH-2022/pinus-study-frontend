import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Navbar, Background, ThreadComponent } from "../components";
import { Colors, ScreenSizes } from "../constants";
import MyModules from "../components/MyModules";
import ModuleForum from "../components/ModuleForum";
import { API_URL } from "../constants";
import {
  Thread,
  ThreadInitialState,
} from "../redux/features/threads/threadSlice";
import CommentList from "../components/comments/CommentList";
import ReplyTextEditor from "../components/editor/ReplyTextEditor";
import { selectId, selectToken } from "../redux/features/users/userSlice";
import { isLoggedIn } from "../utils";
import { useSelector } from "react-redux";
import InvalidLink from "../components/InvalidLink";

// Uncomment display grid once my module component is done
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-column-gap: 2em;
  padding: 2em;

  ${ScreenSizes.medium_below} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const HeadingDiv = styled.div`
  padding-bottom: 0.5em;
`;

const Heading = styled.span`
  color: ${Colors.dark_grey};
  background: linear-gradient(to bottom, transparent 50%, ${Colors.blue_2_75} 50%);
  font-family: "Poppins", "sans-serif";
  font-weight: 600;
  font-size: 2.25em;
  padding: 2.5px 5px 2.5px 5px;

  ${ScreenSizes.medium_below} {
    font-size: 1.5em;
  }
`
const SpacingEmptyDiv = styled.div`
  padding-top: 2em;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

/** THREAD-PAGE THREAD ONLY Å*/
const ThreadContainerDiv = styled.div`
  background-color: ${Colors.white_1};
  width: calc(100% - 2em);
  border-radius: 20px;
  padding: 1.5em;
  text-align: left;
  font-size: 12px;
  margin: 1em 0;
  border: 2px solid ${Colors.dark_grey};
  box-shadow: 4px 4px 0 ${Colors.green_2},
          4px 4px 0 2px ${Colors.dark_grey};
`;

const EditorContainerDiv = styled.div`
  background-color: ${Colors.white_1};
  width: calc(100% - 2em);
  border-radius: 20px;
  border: 2px solid ${Colors.dark_grey};
  padding: 0.5em 1.5em;
  text-align: left;
  font-size: 12px;
  margin: 1.5em 0;
  box-shadow: 4px 4px 0 ${Colors.green_2},
          4px 4px 0 2px ${Colors.dark_grey};
`;

const MediumText = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: ${Colors.light_grey};
  font-size: 1.6em;
  padding-left: 0.5em;

  ${ScreenSizes.medium_below} {
    font-size: 1.2em;
  }
`;

const GuestBoxDiv = styled.div`
  text-align: center;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const GuestBox = () => {
  return (
    <GuestBoxDiv>
      <MediumText style={{ color: Colors.white, fontSize: "1.25em" }}>
        Please log in to reply.
      </MediumText>
    </GuestBoxDiv>
  );
};

const QuestionPage = () => {
  const { threadId } = useParams();
  const token = useSelector(selectToken);
  const userId = useSelector(selectId);
  const [thread, setThread] = useState<Thread>(ThreadInitialState);
  const [validThread, setValidThread] = useState(true);

  /**
   * Fetches thread data from the backend.
   */
  const fetchThreadData = () => {
    fetch(API_URL + `/thread/${threadId}`)
      .then((response) => response.json())
      .then((data) => {
          if (data.thread.Id == 0) {
          setValidThread(false);
          console.log("Invalid Module");
          return;
        }
        setThread(data.thread);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchThreadData();
  }, []);

  if (!threadId) {
    return <div></div>; // Handle invalid question page here. Probly some 404 page or such
  }

  return (
    <div>
      {validThread ? (
        <>
      <Navbar />
      <Background>
        <MainContainer>
          <div>
            <HeadingDiv>
              <Heading>Discussion Forum</Heading>
            </HeadingDiv>
            <ThreadComponent
              threadId={parseInt(threadId)}
              type="QUESTION_PAGE"
            />
            <SpacingEmptyDiv />
            <HeadingDiv>
              <Heading>Replies</Heading>
            </HeadingDiv>
            {thread.Comments && thread.Comments?.length > 0 ? (
              <>
                <CommentList
                  comments={thread.Comments}
                  threadId={thread.Id}
                  level={0}
                />
                {isLoggedIn(token, userId) ?
                <EditorContainerDiv>
                  <ReplyTextEditor id={0} threadId={thread.Id} />
                </EditorContainerDiv>
                : <GuestBox />}
              </>
            ) : isLoggedIn(token, userId) ? (
              <ThreadContainerDiv>
                <MediumText>No replies yet. Be the first to reply!</MediumText>
                <ReplyTextEditor id={0} threadId={thread.Id} />
              </ThreadContainerDiv>
            ) : (
              <GuestBox />
            )}
          </div>
          <RightSide>
            {thread !== ThreadInitialState ? (
              <ModuleForum selectedModule={thread.ModuleId} />
            ) : null}
            <MyModules />
          </RightSide>
        </MainContainer>
      </Background>
        
        </>
      ) : (
        <>
        <Navbar/>
        <Background>
          <InvalidLink></InvalidLink>
        </Background>
        </>
      )
      }
    </div>
  );
};

export default QuestionPage;
