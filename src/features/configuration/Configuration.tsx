import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Switch,
  HStack,
  Textarea,
  Text,
} from '@chakra-ui/react';
import { FormEvent } from 'react';

import { Icon } from '../../components';
import { useDispatch, useSelector } from '../../hooks';
import {
  getSesEnabled,
  getSnapUrl,
  getSrp,
  setSesEnabled,
  setSnapUrl,
  setSrp,
} from './slice';

export const Configuration = () => {
  const dispatch = useDispatch();
  const snapUrl = useSelector(getSnapUrl);
  const srp = useSelector(getSrp);
  const sesEnabled = useSelector(getSesEnabled);

  const handleSnapUrlChange = (event: FormEvent<HTMLInputElement>) => {
    dispatch(setSnapUrl(event.currentTarget.value));
  };

  const handleSrpChange = (event: FormEvent<HTMLTextAreaElement>) => {
    dispatch(setSrp(event.currentTarget.value));
  };

  const handleSesToggle = () => {
    dispatch(setSesEnabled(!sesEnabled));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        bg="white"
        onClick={onOpen}
        icon={<Icon width="20px" icon="configuration" />}
        aria-label="Configuration"
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Configure environment</Text>
            <Text fontSize="md" color="#535A61">
              Settings and variables to setup the context for the simulation.
            </Text>
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Local server location</FormLabel>
              <Input
                type="text"
                value={snapUrl}
                onChange={handleSnapUrlChange}
              />

              <FormLabel mt="4">Environment SRP</FormLabel>
              <Textarea value={srp} onChange={handleSrpChange} />

              <HStack mt="4" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" htmlFor="ses-switch">
                  Secure EcmaScript (SES)
                </FormLabel>
                <Switch
                  id="ses-switch"
                  size="lg"
                  isChecked={sesEnabled}
                  onChange={handleSesToggle}
                />
              </HStack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              width="100%"
              bg="#24272A"
              textColor="white"
              onClick={onClose}
              _hover={{ bg: '#0376C9' }}
            >
              Apply config
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
