import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'

const defaultImg = 'data:image/png;base64,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';

const Finished = props => {
    return (
    <View>
        {
            props.EventList.finished.length != 0?
            <Text style={{fontFamily: 'Cochin'}}>Finished</Text>
            :
            null
        }
        
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ScrollView horizontal={true}>
                {
                    props.EventList.finished.length != 0 ?
                    props.EventList.finished.map((event, i) =>
                        <View key={i}>
                            {
                                event.status == "finished"?
                                <TouchableOpacity style={{flex: 1, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                                    {
                                        event.picture != null && event.picture != "path_to_default_picture"?
                                        <Image
                                            style={{width: 100,
                                                height: 100,
                                                borderRadius: 20}}
                                            source={{uri: event.picture}}
                                        />
                                        :
                                        <Image
                                            style={{width: 100,
                                                height: 100,
                                                borderRadius: 20}}
                                            source={{uri: defaultImg}}
                                        />
                                    }
                                    <Text style={{marginLeft: 10}}>{event.name}</Text>
                                </TouchableOpacity>
                                :
                                null
                            }
                        </View>
                    )
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: 'red'}}>No Event</Text>
                        </View>
                    </View>
                }
            </ScrollView>
        </View>

    </View>
    )
}

export default Finished
