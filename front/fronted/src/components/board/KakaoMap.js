import React, { useEffect, useState } from 'react';

const { kakao } = window;

const KakaoMap = (props) => {
//     const [ location, setLocation ] = useState(""); 
//     useEffect(() => {
//         // let container = document.getElementById('map');
//         // let options = {
//         //     center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
//         //     level: 3
//         // };
//         // let map = new kakao.maps.Map(container, options);

//     }, [location]);
//     const onLocationChange = (e) => {
//         setLocation(e.target.value);
//         console.log(location);
//     }
//     const onSearchMap = () => {
//         console.log(location);
//     }
//     return (
//         <div>
//             <input id="searchMap" value={location} onChange={onLocationChange} ></input>
//             <button onClick={onSearchMap}>검색</button>
//             {/* <div id="map" style={{width:"100%", height:"400px"}} /> */}
//             <div
//                 id="myMap"
//                 style={{
//                 width: '500px',
//                 height: '500px',
//                 }}>
//             </div>
//         </div>
//     );
// }
    
    const [ location, setLocation ] = useState("순천만"); 
    

    console.log(props);
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

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
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
        <div>
            {
                props.addOrShow === "add"
                ? 
                    <>
                        <input id="searchMap" value={inputText} onChange={onLocationChange} placeholder="가급적 자세하게 입력하세요"></input>
                        <button type="submit" onClick={searchMapSubmit}>검색</button>  
                    </>
                :   <></>
            }
            {/* <input id="searchMap" value={inputText} onChange={onLocationChange} placeholder="가급적 자세하게 입력하세요"></input>
            <button type="submit" onClick={searchMapSubmit}>검색</button>         */}
            <div
                id="myMap"
                style={{
                width: '500px',
                height: '500px',
                }}>
            </div>
        </div>
    )
}


export default KakaoMap;