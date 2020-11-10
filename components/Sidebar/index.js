import React, { useState } from 'react';
import styles from './index.module.scss';
import { Select } from 'baseui/select';
import { Slider } from 'baseui/slider';
import Search from '../Search';
import { Button } from 'baseui/button';
import { Title, SectionTitle, Paragraph } from '../Text';
import download from '../../functions/download';
import { RadioGroup, Radio } from 'baseui/radio';
import getBinSizeDescription from '../../functions/getBinSizeDescription';
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from 'baseui/checkbox';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';
import { StyledLink } from 'baseui/link';
import GridIcon from '../../assets/GridIcon.js';
const Sidebar = ({
   shape,
   setShape,
   value,
   setValue,
   units,
   setUnits,
   size,
   setSize,
   mapVisible,
   setMapVisible,
   collection,
   projection,
   setProjection,
}) => {
   const [activeKey, setActiveKey] = useState('0');
   return (
      <div className={styles.sidebar}>
         <div className={styles.top}>
            <Title>
               <GridIcon style={{ paddingRight: 5, paddingTop: 2 }} />
               CartoGridder
            </Title>
            <Paragraph style={{ marginBottom: 5 }}>
               Generate GeoJSON grid-based maps from administrative boundaries.
            </Paragraph>
         </div>
         <Tabs
            activeKey={activeKey}
            onChange={({ activeKey }) => {
               setActiveKey(activeKey);
            }}
            fill={FILL.fixed}
            activateOnFocus
         >
            <Tab title="Configuration">
               <div className={styles.item}>
                  <SectionTitle style={{ marginTop: 0 }}>
                     Administrative Zone
                  </SectionTitle>
                  <Paragraph>
                     eg: San Francisco, Florida, Italy, or India
                  </Paragraph>
                  <Search value={value} setValue={setValue} />
               </div>
               <div className={styles.item}>
                  <SectionTitle>Grid Type</SectionTitle>
                  <Select
                     options={[
                        { label: 'Hexagon', value: 'hex' },
                        { label: 'Square', value: 'square' },
                        { label: 'Triangle', value: 'triangle' },
                     ]}
                     labelKey="label"
                     valueKey="value"
                     onChange={({ value }) => setShape(value)}
                     value={shape}
                     clearable={false}
                  />
               </div>

               <div className={styles.item}>
                  <SectionTitle>Bin Size Units</SectionTitle>
                  <RadioGroup
                     value={units}
                     onChange={(e) => setUnits(e.target.value)}
                     name="units"
                     overrides={{
                        Label: {
                           style: () => {
                              return {
                                 color: `rgba(0,0,0,0.7)`,
                                 fontWeight: 'normal',
                                 fontSize: '14px',
                              };
                           },
                        },
                     }}
                  >
                     <Radio value="km">Kilometers</Radio>
                     <Radio value="m">Meters</Radio>
                  </RadioGroup>
               </div>
               <div className={styles.item}>
                  <SectionTitle>Bin Size</SectionTitle>
                  <Paragraph>
                     {getBinSizeDescription(shape[0].value, units)}
                  </Paragraph>
                  <Slider
                     value={[size]}
                     onChange={({ value }) => setSize(value)}
                     min={1}
                     max={500}
                  />
               </div>
               {/* <div className={styles.item}>
                  <SectionTitle>Base Map</SectionTitle>
                  <RadioGroup
                     value={projection}
                     onChange={(e) => setProjection(e.target.value)}
                     name="projection"
                     overrides={{
                        Label: {
                           style: () => {
                              return {
                                 color: `rgba(0,0,0,0.7)`,
                                 fontWeight: 'normal',
                                 fontSize: '14px',
                              };
                           },
                        },
                     }}
                  >
                     <Radio value="mercator">Mercator</Radio>
                     <Radio value="globe">Globe</Radio>
                  </RadioGroup>
                  <Checkbox
                     checked={mapVisible}
                     checkmarkType={STYLE_TYPE.toggle_round}
                     onChange={(e) => setMapVisible(e.target.checked)}
                     labelPlacement={LABEL_PLACEMENT.right}
                     overrides={{
                        Label: {
                           style: () => {
                              return {
                                 color: `rgba(0,0,0,0.7)`,
                                 fontWeight: 'normal',
                                 fontSize: '14px',
                              };
                           },
                        },
                     }}
                  >
                     Base map visible
                  </Checkbox>
               </div> */}

               <Button
                  onClick={() => download(value[0].label, collection)}
                  disabled={collection.features.length === 0}
               >
                  Download GeoJSON
               </Button>
            </Tab>
            <Tab title="About">
               <Paragraph style={{ marginTop: 0 }}>
                  Use this tool to generate and download grid-based maps from
                  administrative-level boundary geometries.
               </Paragraph>
               <Paragraph>
                  City, county, state, and country level zones (excluding China)
                  are supported.
               </Paragraph>
               <Paragraph>
                  The grid-based bins are generated using{' '}
                  <StyledLink target="_blank" href="https://turfjs.org/">
                     TurfJS
                  </StyledLink>
                  .
               </Paragraph>
               <Paragraph>
                  This tool was created for Day 10 of the{' '}
                  <StyledLink
                     target="_blank"
                     href="https://twitter.com/tjukanov/status/1311568912950140930"
                  >
                     #30DayMapChallenge
                  </StyledLink>
                  : Grid.
               </Paragraph>

               <Paragraph style={{ marginBottom: 0 }}>
                  Made by{' '}
                  <StyledLink target="_blank" href="https://twitter.com/dbabbs">
                     @dbabbs
                  </StyledLink>
                  , with help from{' '}
                  <StyledLink
                     target="_blank"
                     href="https://twitter.com/burritojustice"
                  >
                     @burritojustice
                  </StyledLink>
                  .
               </Paragraph>
            </Tab>
         </Tabs>
      </div>
   );
};

export default Sidebar;
