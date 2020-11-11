import Map from '../components/Map';
import styles from '../styles/app.module.scss';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import useDebounce from '../hooks/useDebounce';
import SEO from '../components/SEO';
import {
   toaster,
   Toast,
   ToasterContainer,
   KIND,
   PLACEMENT,
} from 'baseui/toast';

const Index = () => {
   const [collection, setCollection] = useState({
      type: 'FeatureCollection',
      features: [],
   });
   const [loading, setLoading] = useState(false);
   const [bounds, setBounds] = useState([]);

   const [projection, setProjection] = useState('mercator');

   const [size, setSize] = useState(100);
   const debouncedSize = useDebounce(size, 900);
   const [shape, setShape] = useState([{ label: 'Hex', value: 'hex' }]);

   const [units, setUnits] = useState('km');
   const [value, setValue] = useState([]);

   const [mapVisible, setMapVisible] = React.useState(true);

   useEffect(() => {
      if (value[0]?.level === 'country' || value[0]?.level === 'state') {
         setUnits('km');
      }
   }, [value]);

   useEffect(() => {
      async function fetchData() {
         setLoading(true);

         try {
            const response = await fetch(
               `/api/create?size=${size}&shape=${shape[0].value}&id=${value[0].id}&level=${value[0].level}&units=${units}`
            ).then((res) => res.json());

            if (response.hasOwnProperty('error')) {
               if (response.type === 'warn') {
                  toaster.warning(response.message);
               } else {
                  toaster.negative(response.message);
               }
               setLoading(false);
            } else {
               setCollection(response.collection);
               setBounds(response.bounds);
               setLoading(false);
            }
         } catch (e) {
            toaster.negative(
               'Error communicating with server. Please try again.'
            );
            setLoading(false);
         }
      }
      if (value.length > 0) {
         fetchData();
      }
   }, [debouncedSize, shape, value, units]);

   const enableMeters =
      value[0]?.level !== 'country' && value[0]?.level !== 'state';

   return (
      <>
         <SEO />
         <div className={styles.app}>
            <Map
               collection={collection}
               bounds={bounds}
               size={size}
               loading={loading}
               mapVisible={mapVisible}
               projection={projection}
            />
            <Sidebar
               shape={shape}
               setShape={setShape}
               value={value}
               setValue={setValue}
               units={units}
               setUnits={setUnits}
               size={size}
               setSize={setSize}
               mapVisible={mapVisible}
               setMapVisible={setMapVisible}
               collection={collection}
               projection={projection}
               setProjection={setProjection}
               enableMeters={enableMeters}
            />

            <ToasterContainer
               placement={PLACEMENT.bottomRight}
               autoHideDuration={5000}
            />
         </div>
      </>
   );
};

export default Index;
