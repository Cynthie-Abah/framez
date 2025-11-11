import { Colors } from '@/constants/theme';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

type DeleteModalProps = {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ 
    openDeleteModal, 
    setOpenDeleteModal, 
    onDelete }) => {
     const colorScheme = useColorScheme();
        const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openDeleteModal}
      onRequestClose={() => setOpenDeleteModal(false)}
    >
      <View style={[styles.centeredView]}>
        <View style={[styles.modalView, {backgroundColor: theme.background}]}>
          <Text style={[styles.modalTitle, {color: theme.text}]}>Delete Post</Text>
          <Text style={[styles.modalText, {color: theme.icon}]}>Are you sure you want to delete this post? This action cannot be undone.</Text>
          
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => setOpenDeleteModal(false)}
            >
              <Text style={[styles.buttonText, {color: theme.ashButton}]}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={() => {
                onDelete();
                setOpenDeleteModal(false);
              }}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
