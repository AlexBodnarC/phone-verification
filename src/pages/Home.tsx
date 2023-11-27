import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { User, selectUsers, setUsers } from "../redux/userSlice";
import { selectAuth , selectPhoneNumber, selectToken  } from "../redux/phoneSlice";
import { UserProfile } from "../components/Account";
import { useNavigate } from "react-router-dom";
import { firestore } from "../main";

export const HomePage = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectAuth);
  const isCheckedToken = useSelector(selectToken);

  const users = useSelector(selectUsers);
  const userPhoneNumber = useSelector(selectPhoneNumber);

  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const findedUser = users.find((user) => user.phoneNumber === userPhoneNumber);

    findedUser && setUser(findedUser);
  }, [users])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = await getDocs(collection(firestore, "users"));
        const usersData = usersCollection.docs.map((doc) => ({
          UID: doc.id,
          id: doc.data().id,
          phoneNumber: doc.data().phoneNumber,
          position: doc.data().position,
          userLastName: doc.data().userLastName,
          userName: doc.data().userName,
        })) as User[];

        dispatch(setUsers(usersData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (!isCheckedToken && !isAuthenticated) {
    navigate("./login");
  }

  return <UserProfile user={user} />;
};
