import React, { useEffect, useState } from 'react';
import "../../styles/KakaoMap.css";

const { kakao } = window;

const KakaoMap = (props) => {
    const [ location, setLocation ] = useState("서울시청"); 
    
    const [ inputText, setInputText ] = useState("");
    useEffect(() => {
        if(props.addOrShow !== "add"){
            setLocation(props.addOrShow);
        }
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        const container = document.getElementById('myMap')
        const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
        }
        const map = new kakao.maps.Map(container, options)

        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(location, placesSearchCB)

        function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            let bounds = new kakao.maps.LatLngBounds()

            for (let i = 0; i < data.length; i++) {
            displayMarker(data[i])
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
            }

            map.setBounds(bounds)
        }
        }

        function displayMarker(place) {
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
        })

        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
            infowindow.open(map, marker)
        })
        }
    }, [location])

    const onLocationChange = (e) => {
        setInputText(e.target.value);
    } 
    const searchMapSubmit = (e) => {
        e.preventDefault();
        setLocation(inputText);
        props.placeFunc(inputText);
        setInputText('');
    }

    return (
        <div className='kakaoMapContainer'>
            {
                props.addOrShow === "add"
                ?
                    <div className='searchArea'>
                        <input id="searchMap" className='searchInput' value={inputText} onChange={onLocationChange} placeholder="장소를 자세하게 입력하세요"></input>
                        <button className="searchBtn" type="submit" onClick={searchMapSubmit}>검색</button>  
                        
                    </div>
                :   <></>
            }
            <div
                id="myMap"
                style={{
                width: '60vw',
                height: '50vh',
                }}>
            </div>
        </div>
    )
}


export default KakaoMap;