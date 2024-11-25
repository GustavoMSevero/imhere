import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

import Participant from "../../components/Participant";

import { styles } from "./styles";

export default function Home(){
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticiapntAdd(){
    if(participants.includes(participantName)){
      return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome.");
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string){
    Alert.alert("Remover", `Remover participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: "Não",
        style: "cancel"
      }
    ])
  }

  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022
      </Text>

      <View style={styles.form}>
        <TextInput 
            style={styles.input}
            placeholder="Nome do participante"
            placeholderTextColor="#6b6b6b"
            onChangeText={setParticipantName}
            value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticiapntAdd}>
            <Text style={styles.buttonText}>
                +
            </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
              key={item}
              name={item} 
              onRemove={() => handleParticipantRemove(item)}
            />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}