import React from 'react';
import './About.css';
import cell_banner from './cell_banner_cropped.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import text from './data.js';
import tabs from './dates.js';
import names from './names.js';
import description from './description';
import Rick from './rick.png';
import HP from './HP.png';
import oak from './oak.png';
import Flippy, { FrontSide, BackSide} from 'react-flippy';
import wolf from './wolf.png';
import dead from './dead.png';
import git from './git.png';
//This is where images and libraries are imported so that the page can run/use these resources.
//To import a new image, just paste an image into the About file, then follow the import image lines shown above
//example: import image from './image.png'

// info about CSS grids: https://www.youtube.com/watch?v=HgwCeNVPlo0
//old tutorial about react tabs, did make tabs more dynamic: https://www.youtube.com/watch?v=tBaBl7gpYhs&t=1s
//modern info on the tabs and its source: https://reactcommunity.org/react-tabs/
//source on the flipping cards: https://www.npmjs.com/package/react-flippy


//Just passing info into new vars. 
var data = text;
var info = tabs;
var names_data = names;
var desc_data = description;

class About extends React.Component {
//runs the page
    render() {
       
        //Handles what's displayed on front of leader card, only alter if you want to change the style, not the information or image shown. 
        //Thats handled at the bottom of the page (nearly) with the groupings of the founderCards.
        //If you change the style here, it will not be replicated on the back of the card. Just repeat your changes to the Backside below.
        const name_card = (x,z) => {
            return (  <FrontSide
                style={{
                    backgroundColor: 'black', //hanldes card color
                    display: 'flex', //don't touch
                    alignItems: 'center', //makes cards be positioned in the center
                    flexDirection: 'column',
                    color: 'white', //controls color of text
                    fontSize: '24px', //controls text size
                    borderRadius: '80px' //specifies the radius of the card border. making the number larger will give you a rounder leader card on the front
                }}>
                <img src={z} className = 'crdimg' /> 
                {x}
                <span className="front"></span>
              </FrontSide>)   
            };

        // const name_desc = desc_data.map((x) => {
        //     console.log(x);
        // return (  <BackSide
        //     style={{ backgroundColor: '#175852'}} key = {x}>
        //     {x}
        //   </BackSide>
        // )   
        // });
             //Handles what's displayed on back of leader card, only alter if you want to change the style of the back, not the decription. 
        //Thats handled at the bottom of the page (nearly) with the groupings of the founderCards.
        const name_desc = (x) => {
            return (<BackSide
                style={{ backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'white', 
                fontSize: '24px', 
                borderRadius: '80px' 
                }} >
                {x}
              </BackSide>)
        };
        
        const title = info.map((x) => {
            console.log(x);
        return (<Tab className = 'tabs__item' key = {x}>{x}</Tab>)   
        });

        const text = data.map((x) => {
            return (<TabPanel className = 'TimeText' key = {x}> {x}</TabPanel>)  
            });

        const ControlledTabs = (
            <Tabs className = 'primary_nav'>
                <TabList className = 'tab'>
                    {title}
                </TabList>
                {text}
            </Tabs>  
            // <Tabs defaultActiveKey={2} onChange={callback} renderTabBar={() => <ScrollableInkTabBar />} renderTabContent={() => <TabContent />}onSelect = {index => console.log(index)} >
            //     <TabPane tab="tab 1" key="1">
            //         first </TabPane>
            //     <TabPane tab="tab 2" key="2">
            //         second </TabPane>
            //     <TabPane tab="tab 3" key="3">
            //         third </TabPane>
            // </Tabs>,
            // document.getElementById("t2")
        );
            //function that makes leadership cards. If you want to add a new leader card, don't mess with this, go to the founderCard section in the return braces shown below
        const founderCards = (x, y, z) => (
            <Flippy className = 'cards'
            flipOnHover={true} // default false
            flipOnClick={false} // default false
            flipDirection="horizontal" // horizontal or vertical
            ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
            // if you pass isFlipped prop component will be controlled component.
            // and other props, which will go to div
            style={{ width: '300px', height: '450px' }} /// these are optional style, it is not necessary
          >
         
          {name_card(x, z)}
          
          {name_desc(y)}
            </Flippy>
        );

        return (
            // This handles everything. This body literally displays everything that is in the About page. 
            //If you want to change some wording, change <h1> <h2> and <p> words that aren't in quotes. Otherwise the page will break since you would be
            //altering how the website is displaying this information.
            <body className = 'grid_containerA'>
                <img className="img" src={cell_banner} center />
                <h2 className="abt">About Us</h2>
                <div className = 'mission'>                 
                    <h1 className = 'pushDown'><span>Mission Statement</span> </h1>
                    <div>
                    <p className = 'alignA'> Here at BioTork, our mission is to improve world sustainability and the environmental conditions of our planet for generations to come. Recycling waste, sustainable agriculture and renewable energy are threads that run through all of the projects we undertake. By improving biological processes, we convert low-value agricultural by-products to commodities such as renewable energy and high value supplements.</p>
                    <p className = 'alignA'> As a company, we are dedicated to preserving the gifts and harnessing the power of nature.</p>
                    </div>
                </div>
               {/* This handles the business info and title for business info. */}
                <div className = 'business_info'>
                     <h1 className = 'bussmodelTitle'><span>Business Model </span></h1>
                    <div>
                    <p className = 'alignA'>The financial potential of BioTork is endless. With the license to utilize an exclusive, patented evolution technology, BioTork can improve any kind of microorganism on any substrate. The result is an infinite number of applications of our technology and expertise. Improving the cellular factories is like changing the software of a process without needing to change the hardware. Therefore, our business strategy is based on this software model.</p>
                    <p className = 'alignA'>Once a market and potential partners have been identified, BioTork offers two possible commercialization pathways for its optimized cellular factories:</p>
                    </div>
                </div>
                {/* This handles the Licensing and Partnering section */}
                    <div className = 'license'>
                        <h2 className = 'it1'>Licensing</h2>
                        <p className = 'it2'>BioTork has a portfolio of proprietary strains that have already been optimized for certain industrial purposes. These strains can be licensed along with technical support services. </p>
                        <h2 className = 'it3'>Partnering</h2>
                        <p className = 'it4'> BioTork looks to establish joint partnerships with organizations for the purpose of fulfilling industrialization of new fermentation-based products developed by BioTork.</p>
                        <p className = 'it5'>This involves partnering with industry players already connected with the targeted value chain to accelerate scale-up towards commercial production.  </p>
                    
                    </div>
                    {/* This handles the Internal development projects descriptions and title. */}
                    <h1 className = 'internalTitle'><span> Internal Development Projects</span> </h1>
                    <div className = 'ProjectsA'>
                        <p className = 'alignA'> <strong>Omega-3 Fatty Acids</strong>: Highly unsaturated omega-3 fatty acids like DHA and EPA are very high-value oils currently sourced from wild caught fish. BioTork has been developing heterotrophic algae capable of producing high oil titers that are rich in DHA and EPA.</p>
                        <p className = 'alignA'>These algae produce these oils with high efficiency on low-cost agroindustrial feedstocks such as thin stillage, cane juice concentrate, molasses and crude glycerol. These algae produce oil and biomass that can be used as a replacement for fish oil and fish meal in animal feed formulations and in the nutraceutical and cosmeceutical industries.</p>
                        <p className = 'alignA'><strong>Fuel Ethanol Yeasts</strong>: The fuel ethanol industry relies on S. cerevisiae as the workhorse fermentation organism. The majority of the industry relies on a single strain produced by LeSaffre called Ethanol Red. BioTork has developed a derivative of Ethanol Red that produces 2-5% more ethanol per batch. This strain has been tested by several fuel ethanol producers and its improved performance has been confirmed. We are currently in negotiations to pilot this strain with a major yeast manufacturer and corn ethanol producer. BioTork is also developing its own line of non-GMO yeasts that produce glucoamylase to reduce the enzyme costs for corn ethanol producers. In addition, BioTork is working with a major yeast developer to improve an already-commericalized genetically engineered yeast strain capable of producing glucoamylase.</p>
                        <p className = 'alignA'><strong>Distillery Yeasts</strong>: The distilled spirits industry has seen a tremendous increase in demand. Because the processes used to ferment spirits like whiskey are largely constrained by tradition, the easiest place to improve productivity is by improving the yeasts. BioTork has developed strains of yeast capable of 10-20% high ethanol productivities on real-world whiskey fermentation substrates. We are currently in discussions with whiskey producers to pilot these strains.</p>
                        <p className = 'alignA'><strong>Phytase</strong>: Phytase is a valuable enzyme used in the food and feed industries to reduce the antinutrient properties of phytic acid in grains. BioTork has developed a strain of filamentous fungus that secretes 60-fold more phytase enzyme than the parent strain. This strain can be used to produce a non-GMO phytase for the feed market. Moreover, the strain can be used as a production platform for making genetically engineered phytases with improved thermotolerant.</p>
                        <p className = 'alignA'><strong>High Temperature E. coli</strong>: E. coli is a workhorse cellular factory. BioTork has developed a strain of E. coli capable of robust growth at 49⁰C. This strain can be used as a platform chemical production strain for processes that require higher temperatures.    </p>
                    </div>

                    {/* This area handles the Timeline */}
                <h1 className = 'timelineTitle'> <span>Timeline</span> </h1>
                <div className = 'timeLine'>
                    <div>
                        {/* To make a new timeline date/descrption, go to date.js to edit/make dates, and go to data.js to make/edit descriptions for these dates. 
                        They are also postioned automatically. */}
                        {ControlledTabs}
                        <img className="img" src={cell_banner} center />
                    </div>
                </div> 
                <h1 className = 'leaderTitle'><span>Leadership</span></h1>
                <div className = 'leaderCards'>
                    {/* This is where all the leader cards are. Just copy/paste one of the founderCards (with the braces) to make a new leader card. 
                    To make/edit card names, go to names.js in the About file. To make/edit a description, go to description.js 
                    To edit the images, which is the name at the end (these being Rick, HP and oak) just paste an image into the About file that you want,
                    and then import it using the method as seen at the top as seen with these example names, then use that import name at the ned of
                    a founderCard(new or edited) to use that image*/}
                    <div className = 'leaderCards'>
                    {founderCards(names_data[0],desc_data[0], Rick)}
                    {founderCards(names_data[1],desc_data[1], HP)}
                    {founderCards(names_data[2],desc_data[2], oak)}
                    </div>
                </div>
                <h1 className = 'sponsorTitle'><span>Our Sponsors</span></h1>
                {/* This is where the sponsors are located. The names of the images being used are with the curly braces, the styling class that positions the pictures has the log1, 
                log2 and log3 names. There is an invisible grid that holds the images, which is created using the 'sponsorLogos' class. These are located in About.css. Go There
                if you wish to create a new placement for a new logo or change how these are positioned altogther. You can create a new logo by copy pasting one of these <img>
                units, creating a new className in the About.css to poisiton it and putting the appropriate image name in the curly brace */}
                <div className = 'sponsorLogos'>
                    <img className = 'log1' src = {wolf}/>
                    <img className = 'log2' src = {git}/>
                    <img className = 'log3' src = {dead}/>
                </div>
            </body>
        )
    }
}
export default About;