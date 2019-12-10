const updateStateEvent = new Event("updateState");

function useState(target) {
  let state = new Proxy(target, {
    set: function(target, property, value) {
      document.dispatchEvent(updateStateEvent);
      target[property] = value;
      return true;
    },
    get: function(target, property) {
      return target[property];
    }
  });

  function setter(newState) {
    state = Object.assign(state, newState);
  }

  return [state, setter];
}

function useEffect(callback = () => {}, observableState) {
  document.addEventListener("updateState", (e) => {
    console.log(e);
    callback();
  });
}

const [state, setState] = useState({ xy: 25, x: 5, y: 5 });
const [stateNull, setStateNull] = useState({});

useEffect(() => {
  console.log("Test");
}, state);

setState({ x: 10, z: 5, o: "Test" });
