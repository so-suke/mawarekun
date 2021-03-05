import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

// 準備作業として、回転数, 店名, ボーダーを事前に入力する。
const prepare = (selectBoxStoreName: HTMLElement, inputBorder: HTMLElement) => {
  fireEvent.change(selectBoxStoreName, { target: { value: "DoruNakano" } });
  fireEvent.change(inputBorder, { target: { value: "18.0" } });
};

describe("App", () => {
  test("通常使用のテスト", async () => {
    render(<App />);
    // confirm出現時、常にtrueを選択するように。
    window.confirm = jest.fn(() => true);

    // 数字ボタン定義
    const buttonsNumber: { [key: string]: HTMLElement } = {
      zero: screen.getByRole("button", { name: "0" }),
      one: screen.getByRole("button", { name: "1" }),
      two: screen.getByRole("button", { name: "2" }),
      nine: screen.getByRole("button", { name: "9" }),
    };

    const buttonResetStart = screen.getByRole("button", { name: "リセットスタート" });
    const buttonRotation = screen.getByRole("button", { name: "回転" });
    const buttonDeleteAllRotation = screen.getByRole("button", { name: "全行削除" });
    const selectBoxStoreName = screen.getByRole("combobox");
    const inputBallNumberConfirm = screen.getByTestId("ball-number-confirm");
    const inputBorder = screen.getByTestId("border");
    const workAmount = screen.getByTestId("work-amount");
    // const workAmount = screen.getByText("仕事量：");

    // 複数回使用するため定義
    const clickDeleteAllRotationButton = () => {
      userEvent.click(buttonDeleteAllRotation);
    };

    prepare(selectBoxStoreName, inputBorder);

    // 通常の回転数テストと確認用玉数テスト
    fireEvent.change(inputBallNumberConfirm, { target: { value: "1000" } });
    await userEvent.click(buttonsNumber.zero);
    await userEvent.click(buttonResetStart);
    await userEvent.click(buttonsNumber.one);
    await userEvent.click(buttonsNumber.zero);
    await userEvent.click(buttonRotation);
    expect(workAmount).toHaveTextContent("99");
    await userEvent.click(buttonsNumber.two);
    await userEvent.click(buttonsNumber.two);
    await userEvent.click(buttonRotation);
    expect(inputBallNumberConfirm).toHaveValue(772);
    expect(workAmount).toHaveTextContent("310");

    // 短縮入力テスト①　99から
    await clickDeleteAllRotationButton();
    await userEvent.click(buttonsNumber.nine);
    await userEvent.click(buttonsNumber.nine);
    await userEvent.click(buttonResetStart);
    await userEvent.click(buttonsNumber.one);
    await userEvent.click(buttonsNumber.zero);
    await userEvent.click(buttonRotation);
    await userEvent.click(buttonsNumber.two);
    await userEvent.click(buttonsNumber.two);
    await userEvent.click(buttonRotation);
    expect(workAmount).toHaveTextContent("366");

    // 短縮入力テスト②　999から
    await clickDeleteAllRotationButton();
    await userEvent.click(buttonsNumber.nine);
    await userEvent.click(buttonsNumber.nine);
    await userEvent.click(buttonsNumber.nine);
    await userEvent.click(buttonResetStart);
    await userEvent.click(buttonsNumber.one);
    await userEvent.click(buttonsNumber.one);
    await userEvent.click(buttonRotation);
    await userEvent.click(buttonsNumber.two);
    await userEvent.click(buttonsNumber.zero);
    await userEvent.click(buttonRotation);
    expect(workAmount).toHaveTextContent("254");
  });
});
