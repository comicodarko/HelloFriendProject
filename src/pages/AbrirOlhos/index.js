import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableWithoutFeedback } from 'react-native';
import ImmersiveMode from 'react-native-immersive-mode';

import Dice from '../../components/Dice';
import Achievement from '../../components/Achievement';
import { Container } from '../Menu/styles';
import { zoomIn, zoomOut } from '../../animations';
import { NarratorText, Choices, Choice, ChoiceText, Animation } from './styles';

import { Test1, Test2 } from './exportedAnimations';

export default function AbrirOlhos() {
  
  const [pressDisable, setPressDisable] = useState(true);
  const [text, setText] = useState({});
  const [isAnimation, setIsAnimation] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('');
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState('#141414');
  const [currentTextColor, setCurrentTextColor] = useState('#000');
  const [isChoice, setIsChoice] = useState(false);
  const [rollDice, setRollDice] = useState(false);
  const [diceResult, setDiceResult] = useState(1);
  const [selectedChoice, setSelectedChoice] = useState({});
  const [currentChoices, setCurrentChoices] = useState([]);
  const [choicesState, setChoicesState] = useState({});

  console.log(diceResult)

  function showTextNode(textNodeIndex) {
  
    rollDice && toggleDice(false);
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    setText(textNode);
    setCurrentChoices([]);
    
    if(textNode.previousAnimation && textNode.previousAnimation.id !== currentAnimation.id) {
      setCurrentAnimation(textNode.previousAnimation);
      setIsAnimation(true);
    } else if(textNode.nextAnimation) {
      setCurrentAnimation(textNode.nextAnimation);
      setIsAnimation(true);
    } else if(textNode.choices) {
      setTimeout(() => {
        textNode.choices.map((choice) => {
          setCurrentChoices(currentChoices => [...currentChoices, choice]);
        })
      }, 1000);
    } else {
      setIsChoice(false);
    }
  }

  function selectChoice(choice) {
    setSelectedChoice(choice);
    const nextTextNode = textNodes.filter((text) => { return text.id === choice.nextText })

    if(choice.setState) {
      let states = choicesState;
      states = Object.assign(states, choice.setState)
      setChoicesState(states);
    }

    if(choice.dice) {
      toggleDice(true);
    } else {
      if(nextTextNode.previousAnimation) {
        setCurrentAnimation(nextTextNode.previousAnimation);
        setIsAnimation(true);
      } else {
        setIsAnimation(false);
        showTextNode(choice.nextText);
      }
    }
    
    
  }

  function handleSetDiceResult(result) { setDiceResult(result) }
  function toggleDice(toggle) { setRollDice(toggle) }

  let textNodes = [
    // ESTRUTURA DEFAULT
    // {
    //   id: 0,
    //   previousAnimation: true,
    //   previousAnimationColor: '#202020',
    //   text: 'bla bla bla'
    //   nextAnimation: false / import
    //   nextAnimationColor: false / '#ddd' 
    //   choices: [
    //     {
    //       text: 'bla n??o',
    //       nextText: 2.1,
    //       setState: { atributoEstado: false }
    //     },
    //     {
    //       text: 'bla sim',
    //       nextText: 2.2,
    //       setState: { atributoEstado: true }
    //     }
    //   ]
    // },
    {
      id: 1,
      text: 'Voc?? est?? em uma sala escura, nela n??o existe nada, apenas 4 paredes e nenhuma mob??lia, na sua perp??tua escurid??o a ??nica coisa que pode ser vista, ou melhor, sentida ?? o seu contorno...',
      choices: [
        {
          text: 'tocar seu rosto',
          // nextText: 2.1,
          nextText: 'meme-2',
          setState: { encarouAbismo: false },
        },
        {
          text: 'encarar o abismo',
          nextText: 2.2,
          setState: { encarouAbismo: true }
        }
      ]
    },
    {
      id: 2.1,
      text: 'Voc?? levanta, se entende como ser neste espa??o claustrof??bico, e tocando o pr??prio rosto, sente que at?? ent??o eles n??o estavam realmente abertos...',
      choices: [
        {
          text: 'manter olhos fechados',
          nextText: 2.11
        },
        {
          text: 'abrir os olhos',
          nextText: 3
        }
      ]
    },
    {
      id: 2.11,
      text: 'Tocando seu rosto voc?? consegue sentir que algo est?? errado, esse lugar por mais familiar que seja, ele n??o parece real, n??o deve ser real...',
      choices: [
        {
          text: 'abrir os olhos',
          nextText: 3,
          setState: { rotaMeme: false }
        },
        {
          text: 'rolar na cama',
          nextText: 'meme-1',
          setState: { rotaMeme: true }
        }
      ]
    },
    //ROTA MEME
    {
      id: 'meme-1',
      text: 'Mas ?? claro que isso est?? errado, ?? mais um dos seus pesadelos, o mesmo lugar, mesma casa, acho que ?? a hora de acordar, amigo.',
      choices: [
        {
          text: 'acordar',
          nextText: 'meme-2'
        }
      ]
    },
    {
      id: 'meme-2',
      text: 'ILL O rosto ?? todo rasurado em rotoscopia pra representar que ele n??o se conhece bla bla bla mama meu ovo seus olhos abrem, est?? tudo em preto e branco, voc?? olha no rel??gio, s??o 4:35 AM, voc?? respira fundo, encara o teto e reflete, rel??gio de parede e s??o 5:20, banho.\n\nVoc?? olha pra seu celular, j?? s??o quase 6 horas e voc?? ainda est?? perambulando pela casa de cueca, vamos l?? campe??o, daqui a pouco ?? hora de trabalhar.',
      choices: [
        {
          text: 'criar coragem para se vestir',
          dice: true,
          diceValues : ['meme-2-1', 'meme-2-2', 'meme-2-2', 'meme-2-2', 'meme-2-3', 'meme-2-3']
        },
        {
          text: 'ir fazer um caf??',
          nextText: 'meme-2-4'
        }
      ]
    },
    // Dice = 1
    {
      id: 'meme-2-1',
      text: 'Voc?? encara seu telefone por alguns minutos, apoia a cabe??a na mesa...\n\nILL cabe??a na mesa.',
      nextText: 'meme-2-1-1'
    },
    {
      id: 'meme-2-1-1',
      text: '...',
      nextText: 'meme-2-1-2'
    },
    {
      id: 'meme-2-1-2',
      text: 'Droga, j?? s??o 7 horas, acho que voc?? vai se atrasar.',
      nextText: 'meme-2-1-3'
    },
    {
      id: 'meme-2-1-3',
      text: 'Voc?? corre escada a baixo, e da portaria voc?? v?? o 141 indo embora, n??o adianta correr, esperar 10 minutos agora pra pegar o 142...',
      nextText: 'meme-2-1-4'
    },
    {
      id: 'meme-2-1-4',
      text: '...',
      nextText: 'meme-2-1-5'
    },
    {
      id: 'meme-2-1-5',
      text: '??timo, chegou o ??nibus, ?? isso mesmo, aquele que chacoalha e te deixa enjoado.\n\nILL voc?? no ??nibus chacoalhando indo pra o trabalho, entra no trabalho, senta em frente ao PC, respira fundo e come??a a clicar, um rel??gio girando 3 horas em 3 segundos, voc?? encosta a cabe??a na mesa e aquele menu de abertura, ABRIR OS OLHOS.',
      nextText: 'meme-3'
    },
    // Dice = 2, 3, 4
    {
      id: 'meme-2-2',
      text: 'Voc?? encara o telefone, assiste um ou 2 v??deos no Youtube',
      nextText: 'meme-2-2-1'
    },
    {
      id: 'meme-2-2-1',
      text: '...',
      nextText: 'meme-2-2-2'
    },
    {
      id: 'meme-2-2-1',
      text: '...\n\nDroga, quase 7 horas, voc?? realmente deveria levantar.',
      nextText: 'meme-2-2-3'
    },
    {
      id: 'meme-2-2-3',
      text: 'Voc?? corre at?? o quarto, pega a primeira roupa que te aparece e veste ??s pressas.\n\n ILL clipe vestindo.',
      nextText: 'meme-2-2-4'
    },
    {
      id: 'meme-2-2-4',
      text: 'Voc?? corre at?? o quarto, pega a primeira roupa que te aparece e veste ??s pressas.',
      nextText: 'meme-2-2-5'
    },
    {
      id: 'meme-2-2-5',
      text: 'Voc?? desce as escadas, e olha, o ??nibus 141 est?? l?? te esperando, pelo menos n??o ?? o que chacoalha. \n\n ILL no ??nibus indo pra o trabalho, entra no trabalho, senta em frente ao PC, respira fundo e come??a a clicar, um rel??gio girando 3 horas em 3 segundos, voc?? encosta a cabe??a na mesa e aquele menu de abertura, ABRIR OS OLHOS.',
      nextText: 'meme-3'
    },
    // Dice = 5, 6
    {
      id: 'meme-2-3',
      text: 'Voc?? levanta, estica as costas, respira fundo, vai ser um longo dia.',
      nextText: 'meme-2-3-1'
    },
    {
      id: 'meme-2-3-1',
      text: 'Voc?? levanta, estica as costas, respira fundo, vai ser um longo dia.',
      nextText: 'meme-2-3-1'
    },
    {
      id: 'meme-2-3-1',
      text: 'ILL indo olhando pra baixo. \n\nCaminhando da sala para o quarto, voc?? sente falta daquele bel??ssimo caf?? da manh??, mas voc?? n??o est?? t??o disposto assim. \n\nIndo at?? o guarda roupa, pega sua camiseta preta, seu casaco, sua cal??a jeans e seu t??nis. \n\nVoc?? desce as escadas, e olha, o ??nibus 141 est?? l?? te esperando, pelo menos n??o ?? o que chacoalha.',
      nextText: 'meme-2-3-2'
    },
    {
      id: 'meme-2-3-2',
      text: 'ILL no ??nibus indo pra o trabalho, entra no trabalho, senta em frente ao PC, respira fundo e come??a a clicar, um rel??gio girando 3 horas em 3 segundos, voc?? encosta a cabe??a na mesa e aquele menu de abertura, ABRIR OS OLHOS.',
      nextText: 'meme-3'
    },
    // Fazer caf??
    {
      id: 'meme-2-4',
      text: 'Voc?? levanta, estala suas costas e vai at?? o fog??o, e prepara seu caf?? instant??neo. ILL fazendo caf?? kk',
      nextText: 'meme-2-4-1',
    },
    {
      id: 'meme-2-4-1',
      text: '5 minutinhos s??o o suficiente para que seu caf?? fique pronto.',
      choices: [
        {
          text: 'Deixar caf?? preto',
          nextText: 'meme-2-4-1-1'
        },
        {
          text: 'Por a????car',
          nextText: 'meme-2-4-1-2'
        }
      ]
    },
    {
      id: 'meme-2-4-1-1',
      text: 'ILL tomando caf?? puro.',
      nextText: 'meme-2-4-2'
    },
    {
      id: 'meme-2-4-1-1',
      text: 'ILL pondo a????car.',
      nextText: 'meme-2-4-2'
    },
    {
      id: 'meme-2-4-2',
      text: 'Voc?? est?? disposto e pronto para um dia produtivo, vamos l??... \n\n ILL vai indo olhando pra baixo.',
      nextText: 'meme-2-4-3'
    },
    {
      id: 'meme-2-4-3',
      text: 'Caminhando da cozinha para o quarto, voc?? sente falta daquele bel??ssimo caf?? da manh??, mas voc?? n??o est?? t??o disposto assim. \n\nIndo at?? o guarda roupa, pega sua camiseta preta, seu casaco, sua cal??a jeans e seu t??nis. \n\nVoc?? p??e a sua roupa, desce as escadas do pr??dio, e vai ao ponto de ??nibus. \n\nVoc?? desce as escadas, e olha??nibus 141 est?? l?? te esperando, pelo menos n??o ?? o que chacoalha. ',
      nextText: 'meme-2-4-4'
    },
    {
      id: 'meme-2-4-4',
      text: 'Voc?? est?? disposto e pronto para um dia produtivo, vamos l??...',
      nextText: 'meme-2-4-5'
    },
    {
      id: 'meme-2-4-5',
      text: 'Voc?? desce as escadas, e olha, o ??nibus 141 est?? l?? te esperando, pelo menos n??o ?? o que chacoalha. ILL no ??nibus indo pra o trabalho, entra no trabalho, senta em frente ao PC, respira fundo e come??a a clicar, um rel??gio girando 3 horas em 3 segundos, voc?? encosta a cabe??a na mesa e aquele menu de abertura, ABRIR OS OLHOS.'
    },
    
    // ROTA NORMAL
    {
      id: 2.2,
      text: 'Ele consome at?? a ??ltima gota da sua fina pel??cula sanidade, o medo corr??i os teus ossos, voc?? n??o est?? sozinho, agora est?? com o abismo.',
      nextText: 3,
    },
    {
      id: 3,
      previousAnimation: Test1,
      previousAnimationColor: '#fff',
      text: 'As luzes acendem, existem tr??s coisas que roubam sua aten????o, elas est??o dividindo espa??o com voc??.',
      nextAnimation: Test2,
      nextAnimationColor: '#000',
      choices: [
        {
          text: 'ir ?? porta',
          nextText: 3.1
        },
        {
          text: 'ir at?? a caixa',
          nextText: 3.2
        },
        {
          text: 'ir at?? o espelho',
          nextText: 4
        }
      ]
    },
    {
      id: 3.1,
      text: 'ILL H?? uma porta, desenho est??tico, passa 2,5 segundos em tela, depois a frase\n\n\n(A porta est?? lacrada, isso ?? mostrado pelo som de porta abaixo.)\n\n\nILL A ma??aneta gira, o som ?? de porta trancada.',
      choices: [
        {
          text: 'ir at?? a caixa',
          nextText: 3.2
        },
        {
          text: 'ir at?? o espelho',
          nextText: 4
        }
      ],
    },
    {
      id: 3.2,
      text: 'ILL Static, caixa lacrada com uma camada de fita, na caixa tem escrito ???Tralhas do papai???.\n\nVoc?? precisa de algo para abrir isso.',
      choices: [
        {
          text: 'ir at?? a porta',
          nextText: 3.1
        },
        {
          text: 'ir at?? o espelho',
          nextText: 4
        }
      ]
    },
    {
      id: 4,
      text: 'ILL Desenho do espelho com as 3 imagens refletidas abaixo.\n\nVoc?? se depara com um espelho fragmentado, seu reflexo ?? totalmente distorcido, voc?? est?? fragmentado em tr??s.\n\nNo canto superior reflexo parece negro, denso, quase como se a sua sombra tomasse de assalto este lugar que foi dado ao teu rosto. Adicionar close do reflexo em ILL.\n\nNo inferior voc?? percebe um buraco estranhamente largo no lugar do seu peito, coisa essa que n??o aparece no seu corpo f??sico. Adicionar close do reflexo em ILL.\n\nA ??ltima pe??a se encontra do lado esquerdo, ela pende at?? quase cair, parece que\n\naquele belo e afiado caco clama pelo toque de sua palma. Adicionar close do reflexo em ILL',
      choices: [
        {
          text: 'fitar a sombra',
          nextText: choicesState.encarouAbismo ? 4.1 : 4.2,
        },
        {
          text: 'enfiar a m??o no buraco do peito',
          nextText: 4.3
        },
        {
          text: 'pegar caco de vidro',
          nextText: 4.4
        }
      ]
    },
    {
      id: 4.1,
      text: 'Voc?? estende a m??o, toca o espelho, o reflexo da sombra se estende e toca sua m??o de fora, a sombra se estende al??m do espelho, com a m??o fixa em seu ombro, te empurrando para tr??s, mas apoiando todo seu pouco peso em voc??. ILL\n\n??? Ol?? amigo. ??? Ele sorri com os olhos.',
      choices: [
        {
          text: 'voc?? ?? do abismo?',
          nextText: 4.11,
        },
        {
          text: 'Voc?? ?? o abismo?',
          nextText: 4.12
        },
        {
          text: 'O que ?? voc???',
          nextText: 4.13
        }
      ]
    },
    {
      id: 4.11,
      text: '??? ?? muito cedo pra isso.',
      choices: [
        {
          text: 'enfiar a m??o no buraco do peito',
          nextText: 4.3
        }
      ]
    },
    {
      id: 4.12,
      text: '??? N??o amigo, voc?? ainda n??o est?? pronto para essa conversa.',
      choices: [
        {
          text: 'enfiar a m??o no buraco do peito',
          nextText: 4.3
        }
      ] 
    },
    {
      id: 4.13,
      text: '??? Eu sou o que sou, um gua para o caminho mais seguro.',
      choices: [
        {
          text: 'enfiar a m??o no buraco do peito',
          nextText: 4.3
        }
      ] 
    },
    {
      id: 4.2,
      text: 'Voc?? estende a cabe??a em dire????o ao espelho, for??a os olhos, uma m??o toca teu ombro, tu vira e uma sombra se estende atr??s de ti, ele abre grandes olhos brancos, e acena virando a cabe??a.',
      choices: [
        {
          text: 'enfiar a m??o no buraco do peito',
          nextText: 4.3
        }
      ] 
    },
    {
      id: 4.3,
      text: '??? ?? muito cedo pra isso.',
      choices: [
        {
          text: 'enfiar a m??o no buraco do peito',
          nextText: 4.3
        }
      ]
    },
  ]

  useEffect(() => {
    setPressDisable(true);
    setIsChoice(false);
    setDiceResult(1);
    ImmersiveMode.setBarMode('BottomSticky');
    ImmersiveMode.setBarStyle('Dark');
    setTimeout(() => { showTextNode(1) }, 1000);
  }, [])

  useEffect(() => {
    setCurrentTextColor(currentBackgroundColor === '#141414' ? '#fff' : '#000');
  }, [currentBackgroundColor])

  return (
    <Container currentBackgroundColor={currentBackgroundColor}>
      <StatusBar animated backgroundColor={currentBackgroundColor}
        barStyle={currentBackgroundColor == '#fff' ? 'dark-content' : 'light-content'} />
      {isAnimation
        ? <Animation currentBackgroundColor={currentBackgroundColor}
          source={currentAnimation.animation}
          resizeMode={"contain"}
          rate={1}
          paused={false}
          ignoreSilentSwitch={"obey"}
          onEnd={() => {
            if(currentAnimation.id === text.previousAnimation.id) {
              text.previousAnimationColor && setCurrentBackgroundColor(text.previousAnimationColor);
              setCurrentAnimation();
              showTextNode(text.id);
              setIsAnimation(false);
            } else {
              text.nextAnimationColor && setCurrentBackgroundColor(text.nextAnimationColor);
              if(text.choices) {
                setTimeout(() => {
                  text.choices.map((choice) => {
                    setCurrentChoices(currentChoices => [...currentChoices, choice]);
                  })
                }, 1000);
              } else showTextNode(text.nextText)}}
            }
        />
        : <TouchableWithoutFeedback
          onPress={() =>  {
          if(currentChoices.length > 0) {
            return  
          } else if(!pressDisable){
            setPressDisable(true); 
            if(text.nextAnimation) {
              setIsAnimation(true);
            } else if(!isChoice) {
              showTextNode(text.nextText); 
            }
          } 
        }
      }
      >
        <NarratorText currentTextColor={currentTextColor}
          // minDelay={20} maxDelay={80}
          minDelay={1} maxDelay={5}
          typing={1} fixed={true}
          onTyped={() => {setPressDisable(true); setIsChoice(false)}}
          onTypingEnd={() => {setPressDisable(false); !isChoice && text.choices && setIsChoice(true);}}
        >
          {text.text !== undefined ? text.text : ''}
        </NarratorText> 
      </TouchableWithoutFeedback>
      }
      {isChoice 
        && 
        <Choices animation={isChoice ? zoomIn : zoomOut}>
          {currentChoices.map((choice) => {
            return (
              <Choice
                key={choice.text}
                onPress={() => selectChoice(choice)}
              >
                <ChoiceText>{choice.text}</ChoiceText>
              </Choice>
          )})}
        </Choices>
      }
      {rollDice && 
        <Dice 
          handleSetDiceResult={handleSetDiceResult}
          choice={selectedChoice}
          showTextNode={showTextNode}  
        />}
      <Achievement />
    </Container>
  );
};