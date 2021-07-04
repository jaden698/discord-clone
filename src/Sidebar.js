import React,{useState,useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import CallIcon from '@material-ui/icons/Call'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import MicIcon from '@material-ui/icons/Mic'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'


import { Avatar } from '@material-ui/core';


import './Sidebar.css'
import SidebarChannel from './SidebarChannel'
import { logout, selectUser } from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import db, { auth } from './firebase';


function Sidebar() {
    
    const user=useSelector(selectUser)
    const dispatch = useDispatch()
    const [channels, setChannels] = useState([])
    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot=>{

            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    channel: doc.data()

                })))

        })
    }, [])

    const handleAddChannel=()=>{
        const channelName=prompt("Enter a new channel:")

        if(channelName){
            db.collection('channels').add({
                channelName:channelName,
            })
            console.log(channels)
        }
    }


        
    
    return (
        <div className="sidebar">
          <div className="sidebar-top">
              <h3>Jed Mahfoud</h3>
              <ExpandMoreIcon />
          </div>

            <div className="sidebar_channels">
                <div className="sidebar_channelsHeader">
                    <div className="sidebar_header">
                        <ExpandMoreIcon />
                        <h4>Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar_addchannel" />
                </div>
                <div className="channel_list">
                    {
                        channels.map(({id,channel})=>(
                            <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                        ))
                    }
                    

                </div>
                
            </div>
            <div className="sidebar_voice">
                    <SignalCellularAltIcon 
                        className="sidebar_voiceicon"

                        fontSize="large"
                    />
                    <div className="sidebar_voiceinfo">
                      <h3>Voice Connected</h3>
                      <p>Stream</p>
                    </div>
                    <div className="sidebar_voiceincons">
                       <InfoOutlinedIcon />
                       <CallIcon />
                    </div>
                </div>
                <div className="sidebar_profile">
                  <Avatar onClick={()=>{
                      dispatch(logout())
                      auth.signOut()
                      }} src={user.photo}/>
                  <div className="sidebar_profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                  </div>
                  <div className="sidebar_profileIcons">
                     <MicIcon />
                     <HeadsetIcon />
                     <SettingsIcon />
                  </div>
                </div>
        </div>

    )
}

export default Sidebar
