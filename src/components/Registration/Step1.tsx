import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {Input} from '../Common/CustomInput';
import {PrimaryButton} from '../Common/CustomButton';
import AddressForm from './AddressForm';
import {putValue,NextStep} from '../../store/modules/registration'
import {RootState} from '../../store/modules/index';

const StepContainer = styled.div`
  h3 {
    margin-bottom:32px;
    font-size:28px;
  }
  h4 {
    margin:24px 0 12px 0;
    font-size:18px;
  }
  .nextBtn {
    width:100%;
    text-align:right;
  }
`
const Step1 = () => {
  const {name, phoneNumber, email, website} = useSelector((state:RootState) => state.registration )
  const dispatch = useDispatch();

  const handleValueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = event.target;
    dispatch(putValue(id, value));
  }

  const handleNextClick = () => {
    dispatch(NextStep(2));
  }

  return (
    <StepContainer>
      <h3>기본 정보</h3>
      <h4>공간 이름</h4>
      <Input id="name" onChange={handleValueChange} value={name} name="ex. 워크스토어카페"/>
      <h4>주소</h4>
      <AddressForm/>
      <h4>공간 연락처</h4>
      <Input id="phoneNumber" onChange={handleValueChange} value={phoneNumber} name="000-0000-0000"/>
      <h4>호스트 이메일</h4>
      <Input id="email" onChange={handleValueChange} value={email} name="ex. workstore@email.com"/>
      <h4>웹사이트</h4>
      <Input id="website" onChange={handleValueChange} value={website} name="ex. www.workstore.co.kr"/>
      <div className="nextBtn">
        <PrimaryButton onClick={handleNextClick}>다음</PrimaryButton>
      </div>
    </StepContainer>
  )
}

export default Step1;