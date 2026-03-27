"use client";

import styles from "./CustomerInfo.module.css";
import { useForm, Controller } from "react-hook-form"

type FormData = {
    name: string;
    email: string;
    address: string;
    phone: string;
}

export const CustomerInfo = () => {

    const { handleSubmit, control, formState } = useForm<FormData>({
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            address: "",
            phone: "",
        },
    });

    const onSubmit = (data: FormData) => {
        // 実際はAPI実行？ボタンが押されたらとりあえず入力内容をログに出す
        console.log(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                <Controller
                    control={control}
                    rules={{required:"お名前を入力してください"}}
                    name="name"
                    render={({field,fieldState})=>(
                        <>
                            <label className={styles.label} htmlFor="name">お名前</label>
                            <input className={styles.input} type="text" {...field} id="name" name="name"/>
                            <span className={styles.errorMessage} >{fieldState.error?.message}</span>
                        </>
                    )}
                />
            </div>
            <div className={styles.formGroup}>
                <Controller
                    control={control}
                    rules={{
                        required:"メールアドレスを入力してください",
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Regex pattern for email
                            message: "有効なメールアドレスを入力してください"
                        }
                    }}
                    name="email"
                    render={({field,fieldState})=>(
                        <>
                            <label className={styles.label} htmlFor="email">メールアドレス</label>
                            <input className={styles.input} id="email" type="email" {...field} name="email"/>
                            <span className={styles.errorMessage} >{fieldState.error?.message}</span>
                        </>
                    )}
                />
            </div>
            <div className={styles.formGroup}>
                <Controller
                    control={control}
                    rules={{
                        required:"配送先住所を入力してください"
                    }}
                    name="address"
                    render={({field,fieldState})=>(
                        <>
                            <label className={styles.label} htmlFor="address">配送先住所</label>
                            <textarea
                                className={styles.textarea}
                                {...field}
                                id="address"
                                name="address"
                                rows={4}
                            />
                            <span className={styles.errorMessage} >{fieldState.error?.message}</span>
                        </>
                    )}
                />
            </div>
            <div className={styles.formGroup}>
                <Controller
                        control={control}
                        rules={{
                            required:"電話番号を入力してください",
                            pattern:{
                                value: /^[0-9-]+$/, // 半角数字+ハイフン
                                message: "半角数字またはハイフンを入力してください"
                            }
                        }}
                        name="phone"
                        render={({field,fieldState})=>(
                            <>
                                <label className={styles.label} htmlFor="phone">電話番号</label>
                                <input className={styles.input} {...field} type="tel" id="phone" name="phone"/>
                                <span className={styles.errorMessage} >{fieldState.error?.message}</span>
                            </>
                    )}
                />
            </div>
            <button
                type="submit"
                className={styles.checkoutBtn}
                disabled={!formState.isValid}
            >
                注文を確定する
            </button>
        </form>
    );
}