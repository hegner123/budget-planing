import { Provider, createStore, atom } from "jotai";

const budgetStore = createStore();

const JotaiProvider = ({ children }: any) => {
  return <Provider store={budgetStore}>{children}</Provider>;
};

export default JotaiProvider;
