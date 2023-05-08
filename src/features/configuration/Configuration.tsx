import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Switch,
  HStack,
  Textarea,
  Text,
  Divider,
  Link,
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
      <Link onClick={onOpen}>
        <Icon width="20px" icon="configuration" />
      </Link>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb="0">
            <Text fontSize="2xl">Configure environment</Text>
            <Text fontSize="md" color="#535A61" fontWeight="400">
              Settings and variables to setup the context for the simulation.
            </Text>
          </ModalHeader>
          <Divider my="4" />
          <ModalBody pt="0">
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
            <Button width="100%" onClick={onClose}>
              Apply config
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
