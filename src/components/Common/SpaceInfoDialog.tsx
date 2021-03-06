import * as React from 'react';
import {useState,useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import {PrimaryButton,SubButton} from './CustomButton';
import {BsX} from 'react-icons/bs';

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;
const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;
const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;
const DarkBackground = styled.div`
    position:fixed;
    display:flex;
    align-items:center;
    justify-content:center;
    left:0;
    top:0;
    background-color:rgba(0, 0, 0, 0.8);
    width:100%;
    height:100%;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
    z-index:1111;
    ${(props:styleProps) =>
        props.disappear && css`
          animation-name: ${fadeOut};
        `
    }
`

const DialogBlock = styled.div`
position:relative;
    width:450px;
    min-height:430px;
    padding:1.5rem;
    text-align:center;
    background-color:white;
    border-radius:8px;
    h3 {
        margin: 0;
        margin-top:42px;
        font-size: 1.5rem;
    }
    p {
      margin-top:20px;
      font-size: 1.125rem;
    }
    img {
      width:328px;
      height:139px;
      margin-top:16px;
    }
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;

    ${(props: styleProps) =>
        props.disappear &&
        css`
          animation-name: ${slideDown};
    `}
`

const ButtonGroup = styled.div`
`
const ShortMaginBtn = styled(PrimaryButton)`
    width:183px;
    height:48px;
    margin-top:24px;
`
const SubShortBtn = styled(SubButton)`
      position:absolute;
      background:none;
      color:black;
      font-size:24px;      
      right:0;
    margin:0; 
    width:70px;
    height:40px;
    margin-left:10px;
`

interface ChildProps {
    children:any;
    title:string;
    confirmtext:string;
    cancelText:string;
    visible:boolean;
    onConfirm: () => void;
    onCancel: () => void;
    disappear?: boolean;
}
type styleProps = {
    disappear?: boolean;
}

function SpaceInfoDialog({title, children, confirmtext,cancelText, visible ,onConfirm, onCancel}:ChildProps) {

    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(false);
    console.log('a',localVisible)
    useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
        if (localVisible && !visible) {
          setAnimate(true);
          setTimeout(() => setAnimate(false), 250);
        }
        setLocalVisible(visible);
    }, [localVisible, visible]);
    console.log(localVisible,animate)
  if (!animate && !localVisible) return null;
    return (
        <>
           <DarkBackground disappear={!visible}>
               <DialogBlock disappear={!visible}>
                    <SubShortBtn onClick={onCancel}><BsX/></SubShortBtn>
                    <h3>{title}</h3>
                    <img src="/images/img.png" alt=""/>
                    <p>{children}</p>
                    <ButtonGroup>
                        <ShortMaginBtn onClick={onConfirm}>{confirmtext}</ShortMaginBtn>
                    </ButtonGroup>
               </DialogBlock>
           </DarkBackground>
        </>
    )
}

SpaceInfoDialog.defaultProps = {
    confirmText: '확인',
    cancelText: 'x',
    visible: false
  };

export default SpaceInfoDialog;