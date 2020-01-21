import React from 'react'
import Hero from '@pxblue/react-components/core/Hero'
import ChannelValue from '@pxblue/react-components/core/ChannelValue'
import HeroBanner from '@pxblue/react-components/core/HeroBanner'
import InfoListItem from '@pxblue/react-components/core/InfoListItem'
import ScoreCard from '@pxblue/react-components/core/ScoreCard'
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { ChevronRight, MoreVert } from '@material-ui/icons'
import * as Colors from '@pxblue/colors'
import NotificationsIcon from '@material-ui/icons/Notifications'
import InfoIcon from '@material-ui/icons/Info'
import CloudCircleIcon from '@material-ui/icons/CloudCircle'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import { Flow, GasCylinder, Temp, Moisture as Humidity } from '@pxblue/icons-mui'
import top from '../topology_40.png'
import * as Constants from './Constants'
import substationsInfo from '../substation.json'
import Grid from '@material-ui/core/Grid'

const EVENTS_CONFIG = {
    temperature: {
        icon: <Temp fontSize={'inherit'} htmlColor={Colors.black[500]} />,
        unit: '°F',
    },
    humidity: {
        icon: <Humidity fontSize={'inherit'} htmlColor={Colors.blue[200]} />,
        unit: '%',
    },
    flow: {
        icon: <Flow fontSize={'inherit'} htmlColor={Colors.black[100]} />,
        unit: 'KSCFH',
    },
    volume: {
        icon: <GasCylinder fontSize={'inherit'} htmlColor={Colors.black[500]} />,
        unit: 'KSCFH',
    },
}

const Substations = () => {
    const substations = substationsInfo
    //constructing the hero banner elements
    const HeroObject = substation => {
        let heroView = []
        for (let val in substation.values) {
            if (substation.values[val] != null) {
                heroView.push(
                    <Hero
                        key={val}
                        icon={EVENTS_CONFIG[val].icon ? EVENTS_CONFIG[val].icon : null}
                        label={val.charAt(0).toUpperCase() + val.slice(1)}
                        iconSize={48}
                        fontSize={'normal'}
                    >
                        <ChannelValue
                            value={substation.values[val]}
                            units={EVENTS_CONFIG[val].unit ? EVENTS_CONFIG[val].unit : null}
                        />
                    </Hero>
                )
            }
        }
        return heroView
    }
    //constructing the list elements with alarm and event notifications
    const listElements = substation => {
        return (
            <>
                <InfoListItem
                    dense
                    style={{ height: 36 }}
                    fontColor={substation.alarmCount === 0 ? Colors.black[100] : Colors.red[500]}
                    iconColor={substation.alarmCount === 0 ? Colors.black[100] : Colors.red[500]}
                    title={substation.alarmCount != null ? substation.alarmCount + ' ' + Constants.ALARM_TAGLINE : null}
                    icon={
                        substation.alarmCount != null ? (
                            substation.alarmCount === 0 ? (
                                <NotificationsIcon />
                            ) : (
                                    <NotificationsActiveIcon />
                                )
                        ) : (
                                <span></span>
                            )
                    }
                />

                <InfoListItem
                    dense
                    style={{ height: 36 }}
                    fontColor={substation.eventCount === 0 ? Colors.black[100] : Colors.blue[500]}
                    iconColor={substation.eventCount === 0 ? Colors.black[100] : Colors.blue[500]}
                    title={substation.eventCount != null ? substation.eventCount + ' ' + Constants.EVENT_TAGLINE : null}
                    icon={substation.eventCount != null ? <InfoIcon /> : <span></span>}
                />
                <InfoListItem dense style={{ height: 36 }} title={substation.commStatus} icon={<CloudCircleIcon />} />
            </>
        )
    }

    return (
        <>
            {substations.map(substation => {
                return (
                    <Grid item key={substation.title} xl={4} lg={4} md={4} sm={12} xs={12}>
                        <ScoreCard
                            headerColor={substation.alarmCount > 0 ? Colors.red[500] : Colors.blue[500]}
                            headerBackgroundImage={top}
                            headerTitle={substation.title}
                            headerSubtitle={substation.subtitle}
                            headerInfo={substation.deviceCount != null ? substation.deviceCount + ' ' + Constants.DEVICE_TAGLINE : 0 + ' ' + Constants.DEVICE_TAGLINE}
                            headerFontColor={Colors.white[50]}
                            actionItems={[<MoreVert onClick={() => alert('location')} />]}
                            badge={<HeroBanner style={{ minWidth: 238 }}>{HeroObject(substation)}</HeroBanner>}
                            badgeOffset={0}
                            actionRow={
                                <List style={{ margin: 0 }}>
                                    <ListItem>
                                        <ListItemText primary="View Location" />
                                        <ListItemSecondaryAction>
                                            {' '}
                                            <ChevronRight />{' '}
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            }
                        >
                            <List >{listElements(substation)}</List>
                        </ScoreCard>
                    </Grid>
                )
            })}
        </>
    )
}

export default Substations
