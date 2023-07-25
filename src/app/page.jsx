import Image from "next/image";
import styles from "./page.module.css";
import Hero from "/public/personal.png";
import Button from "@/components/button/Button";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products.
        </h1>
        <p className={styles.description}>
          Turning Your idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <Button url="/portfolio" text="See Our Works" />
      </div>
      <div className={styles.item}>
        <Image className={styles.image} src={Hero} alt="main" />
      </div>
    </div>
  );
}
