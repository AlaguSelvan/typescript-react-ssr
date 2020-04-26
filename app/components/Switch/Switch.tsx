import React from 'react';
import styled from '@emotion/styled';

const Container = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 16px;

  > input {
    display: none;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ddd;
  transition: 0.4s;
  border-radius: 15px;

  &:before {
    position: absolute;
    content: '';
    height: 15px;
    width: 15px;
    background-color: #999;
    transition: 0.2s;
    border-radius: 50%;
  }
`;

const SliderInput = styled.input`
  &:checked + ${Slider} {
    background-color: #0365b2;
    &:before {
      transform: translateX(15px);
      background-color: white;
    }
  }
`;

interface IProps {
  checked: boolean;
  onChange?: () => void;
}

const Switch: React.FC<IProps> = ({ checked, onChange }) => {
  return (
    <Container>
      <SliderInput type="checkbox" checked={checked} onChange={onChange} />
      <Slider />
    </Container>
  );
};

export default Switch;
