import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BoldRule, DrawRule, RuleTitle } from './styles';
import { useTranslation } from 'react-i18next';

interface RulesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function RulesModal({ open, setOpen }: RulesModalProps) {
  const { t } = useTranslation();
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle id='scroll-dialog-title'>Regras</DialogTitle>
      <DialogContent
        dividers={scroll === 'paper'}
        ref={descriptionElementRef}
        tabIndex={-1}
      >
        <RuleTitle>{t('Como jogar')}</RuleTitle>
        {t(
          'Participam duas pessoas, que jogam alternadamente, preenchendo cada um dos espaços vazios. Cada participante poderá usar um símbolo (X ou O). Vence o jogador que conseguir formar primeiro uma linha com três símbolos iguais, seja ela na horizontal, vertical ou diagonal.'
        )}
        <RuleTitle style={{ marginTop: 20 }}>
          {t('Resultados do jogo')}
        </RuleTitle>
        <BoldRule>{t('Vitória')}</BoldRule>
        {t(
          'O vencedor da partida irá receber o valor total da aposta do seu adversário.'
        )}
        <BoldRule>{t('Derrota')}</BoldRule>
        {t(
          'O perdedor da partida terá sua quantia apostada enviada para seu adversário.'
        )}
        <BoldRule>{t('Empate')}</BoldRule>
        {t(
          'Os jogadores precisam jogar, no mínimo, uma revanche para decidir o vencedor e o perdedor da partida. O jogador que sair antes de jogar, no mínimo, uma revanche será considerado o perdedor da partida, onde o valor apostado irá para o oponente. Caso aconteça mais um empate, ambos os jogadores terão duas opções:'
        )}
        <DrawRule>{t('Revanche')}</DrawRule>
        {t(
          'Sempre que a partida se empatar novamente, ambos os jogadores precisam concordar em jogar uma nova revanche.'
        )}
        <DrawRule>{t('Retornar ao menu principal')}</DrawRule>
        {t(
          'Caso um jogador não queira fazer outra revanche ele tem a opção de retornar ao menu principal sem perder qualquer valor de sua quantia apostada.'
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RulesModal;
