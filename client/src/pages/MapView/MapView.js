import React, { useState } from 'react';
import './MapView.css';
import CurrentDate from '../../components/CurrentDate';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import { Wrapper } from "@googlemaps/react-wrapper";

function MapView() {
  const [selectedNode, setSelectedNode] = useState('전체');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [option, setOption] = useState('pm25'); // 초미세먼지 기본값으로 초기화

  const [legendTitle, setLegendTitle] = useState('초미세먼지');
  const [selectedButtonId, setSelectedButtonId] = useState(1);
  const [legendValueGood, setlegendValueGood] = useState('0~15');
  const [legendValueNormal, setlegendValueNormal] = useState('16~35');
  const [legendValueBad, setlegendValueBad] = useState('36~75');
  const [legendValueWorse, setlegendValueWorse] = useState('76~');

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setDropdownOpen(false);
  };

    const selectedButtonAction = (buttonId) => {
        setSelectedButtonId(buttonId);

        var newOption = 'pm25';
        if(buttonId === 1){
          newOption = 'pm25'; // 초미세먼지
          setLegendTitle('초미세먼지');
          setlegendValueGood('0~15');
          setlegendValueNormal('16~35');
          setlegendValueBad('36~75');
          setlegendValueWorse('76~');
        }
        else if (buttonId === 2){
          newOption = 'pm10';
          setLegendTitle('미세먼지');
          setlegendValueGood('0~30');
          setlegendValueNormal('31~80');
          setlegendValueBad('81~150');
          setlegendValueWorse('151~');
        }
        else {
          newOption = 'HCHO';
          setLegendTitle('포름알데히드');
          setlegendValueGood('0~');
          setlegendValueNormal('');
          setlegendValueBad('');
          setlegendValueWorse('');
        }

        setOption(newOption);
    }

  return (
    <div className='main-container'>
      <Wrapper apiKey={"AIzaSyCjp5Sxe-c5mUn1GtfLqEatR0mt7cXYdIM"}>
         <GoogleMap option={option}
          options={{disableDefaultUI: true}}
          />
      </Wrapper>

        <div className='option-container'>
            <button className={selectedButtonId === 1 ? 'active' : ''} onClick={() => selectedButtonAction(1)}>초미세먼지</button>
            <button className={selectedButtonId === 2 ? 'active' : ''} onClick={() => selectedButtonAction(2)}>미세먼지</button>
            <button className={selectedButtonId === 3 ? 'active' : ''} onClick={() => selectedButtonAction(3)}>포름알데히드</button>
        </div>

      <div className='info-container'>
        <div className='node-info'>
          <div className='select-node'>
            <img src='img/leaf.png' alt='leaf' className='leaf' />
            <div className='dropdown'>
              <select value={selectedNode} onChange={(e) => handleNodeSelect(e.target.value)}
                className="node-dropdown"
                >
                  <option value="Node 1">Node 1</option>
                  <option value="Node 2">Node 2</option>
                  <option value="Node 3">Node 3</option>
                  <option value="Node 4">Node 4</option>
                </select>
            </div>
          </div>
          <div>
            <span className="current-time" style={{ fontWeight: '400' }}><CurrentDate/></span>
            <hr className="node-info-divider"></hr>
          </div>
          <div className="value">
            <div className="is-level">
                <div className="sub">
                    <p>초미세먼지</p>
                    <p>미세먼지</p>
                    <p>포름알데히드</p>
                </div>
                <div className="number">
                    <p className="worse">151 ㎍/㎥</p>
                    <p className="normal">120 ㎍/㎥ </p>
                    <p className="good">0.002 ppm</p>
                </div>
                <div className="status">
                    <p className='worse'>위험</p>
                    <p className='normal'>보통</p>
                    <p className='good'>좋음</p>
                </div>
            </div>
            <div className="no-level">
                <div className="sub"> 
                    <p>풍향</p>
                    <p>풍속</p>
                    <p>온도</p>
                    <p>습도</p>
                </div>
                <div className="empty">

                </div>
                <div className="value">
                    <p>남서풍</p>
                    <p>5m/s</p>
                    <p>7 °C</p>
                    <p>30%</p>
                </div>
            </div>
          </div>
        </div>
        <div className='legend-info'>
          <p className='legend-title'>
            <span className='option'>{legendTitle}</span> 범례
          </p>
          <div className='legend-content'>
            <div className='legend-option-status'>
              <p className='good'>좋음</p>
              <p className='normal'>보통</p>
              <p className='bad'>나쁨</p>
              <p className='worse'>매우 나쁨</p>
            </div>
            <div className='legend-option-value'>
                <p className='good'>{legendValueGood}</p>
                <p className='normal'>{legendValueNormal}</p>
                <p className='bad'>{legendValueBad}</p>
                <p className='worse'>{legendValueWorse}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
              }

export default MapView;
